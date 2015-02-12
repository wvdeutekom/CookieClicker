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
Template.building.events ({
	"click .building-buy-button": function () {
		if(Cookies.findOne({_id: "COOKIE"}).current >= this.cost){
			Cookies.update({
				_id: "COOKIE"
			},
			{
				$inc: {
					current: -this.cost
				}
			});
			var temp = HasBuildings.findOne({
				cookieId: "COOKIE",
				buildingId: parseInt(this._id)
			});
			HasBuildings.update({
				_id: temp._id
			},
			{
				$inc: {
					amount: 1
				}
			});
		}
	}
});
Template.building.helpers ({
	hasBuildings: function () {
		return HasBuildings.findOne({ cookieId: "COOKIE", buildingId: parseInt(this._id) }).amount;
	},
	isEnabled: function () {
		return (this.affordable())?'enabled':'disabled';
	}
});