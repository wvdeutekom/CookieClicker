Template.clicker.events ({
	"click #clickerup": function () {
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

Template.clicker.helpers ({
	counter: function () {
		return Cookies.findOne({_id: "COOKIE"}).current;
	}
});

Template.store.helpers ({
	buildings: function () {
		return Buildings.find();
	}
});
Template.building.helpers ({
	hasBuildings: function () {
		return HasBuildings.findOne({ cookieId: "COOKIE", buildingId: parseInt(this._id) }).amount;
	}
});