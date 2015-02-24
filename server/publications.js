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
		return Squad.insert(squad);
	},
	applyIncome: function() {
		Squad.find().forEach(function(squad) {
			var amount = parseFloat("0.0000");
			for(var buildingId in squad.buildings) {
			  	amount += parseFloat(squad.buildings[buildingId] * Buildings.findOne({_id: buildingId}).income);
			}
			amount = amount / 10;
			Squad.update({_id: squad._id},{
				$inc: {
					cookies_current: amount,
					cookies_total: amount
				}
			});
		});
	}
});

Meteor.publish('userData', function() {
  if(!this.userId) return null;
  return Meteor.users.find(this.userId, {fields: {
    squadId: 1,
  }});
});

Meteor.users.allow({
	'update': function(id, doc){
		return true;
	}
});