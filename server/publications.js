Meteor.methods({
	createSquad: function(name) {
		var squad = {
			name: name,
			cookies_total: 0,
			cookies_current: 0,
			private: 0,
			code: '',
			admin: Meteor.userId(),
			buildings: {}
		};
		Buildings.find().forEach(function(building) {
		  	squad.buildings[building._id] = 0;
		});
		Squad.insert(squad, function(error, id){
			return id;
		});
	},
	applyIncome: function() {
		var amount = parseFloat("0.0000");
		if(Meteor.user()){
			var squad = Squad.findOne({_id: Meteor.user().squadId});
		} else {
			var squad = Squad.findOne({name: "Anonymous"});
		}
		for(var buildingId in squad.buildings) {
		  	amount += parseFloat(squad.buildings[buildingId] * Buildings.findOne({_id: buildingId}).income);
		}
		Squad.update({_id: squad._id},{
			$inc: {
				cookies_current: amount,
				cookies_total: amount
			}
		});
	}
});