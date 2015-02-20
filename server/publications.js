Meteor.methods({
	createSquad: function(name) {
		var squad = {
			name: name,
			cookies_total: 0,
			cookies_current: 0,
			private: 0,
			code: '',
			admin: Meteor.userId(),
			buildings: []
		};
		Buildings.find().forEach(function(building) {
		  	squad.buildings.push({
		  		buildingId: building._id,
		  		amount: 0
		  	});
		});
		Squad.insert(squad, function(error, id){
			return id;
		});
	},
	applyIncome: function() {
		var amount = 0;
		if(Meteor.user()){
			var squad = Squad.findOne({_id: Meteor.user().squadId});
		} else {
			var squad = Squad.findOne({name: "Anonymous"});
		}
		for(var i in squad.buildings) {
		  	amount += Math.round(squad.buildings[i].amount * Buildings.findOne({_id: squad.buildings[i].buildingId}).income);
		}
		Squad.update({_id: squad._id},{
			$inc: {
				current: amount,
				total: amount
			}
		});
	}
});
