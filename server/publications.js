Meteor.methods({
	hasBuildingsForID: function (buildingID) {
	   return HasBuildings.findOne({ cookieId: "COOKIE", buildingId: parseInt(buildingID)}).amount;
	},
	createSquad: function() {
		var squad = {
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
	}
});
