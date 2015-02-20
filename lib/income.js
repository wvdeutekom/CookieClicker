Income = new Mongo.Collection("income");



if (Meteor.isServer) {
	Meteor.startup(function () {
		var interval = Meteor.setInterval(increment, 1000);

		function increment () {
			var amount = 0;
			var cursor = Buildings.find();
			cursor.forEach(function(building) {
			  	var numberOfBuildings = HasBuildings.findOne({
					cookieId: "COOKIE",
					buildingId: parseInt(building._id)
				}).amount;
			  	amount += Math.round(numberOfBuildings * building.income);
			});
			Cookies.update({
				_id: "COOKIE"},
			{
				$inc: {
					current: amount,
					total: amount
				}
			});
		}
	});
};