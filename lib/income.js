Income = new Mongo.Collection("income");



if (Meteor.isServer) {
	Meteor.startup(function () {
		var interval = Meteor.setInterval(increment, 1000);

		function increment () {

			Cookies.update({
				_id: "COOKIE"},
			{
				$inc: {
					current: 1,
					total: 1
				}
			});
		}
	});
};