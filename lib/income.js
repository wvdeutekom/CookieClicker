Income = new Mongo.Collection("income");



if (Meteor.isServer) {
	Meteor.startup(function () {
		var interval = Meteor.setInterval(increment, 1000);
		
		function calcIncrement () {
			var income = 0;
			var cursor = Buildings.find();
			cursor.forEach(function(building) {
			  	var numberOfBuildings = HasBuildings.findOne({
					cookieId: "COOKIE",
					buildingId: parseInt(building._id)
				}).amount;
			  	income += Math.round(numberOfBuildings * building.income);
			});
			return parseInt(income);
		}

		function increment () {
			var amount = calcIncrement();
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