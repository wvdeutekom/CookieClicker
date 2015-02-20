Meteor.methods({
	hasBuildingsForID: function (buildingID) {
	   return HasBuildings.findOne({ cookieId: "COOKIE", buildingId: parseInt(buildingID)}).amount;
	}
});
