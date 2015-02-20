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
	},
	total: function () {
		return Cookies.findOne({_id: "COOKIE"}).total;
	}
});

Template.store.helpers ({
	buildings: function () {
		return Buildings.find();
	},
	cookieincome: function () {
		var totalIncome = 0;
		var cursor = Buildings.find();
		if (!cursor.count()) {
			return;
		};

		cursor.forEach(function (building) {
			// window.alert(building._id);
			// var buildingTypeIncome = building.income * building.
			totalIncome += building.income;
		})

		//for eacht building, add income to totalIncome
		return totalIncome;
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
		return Meteor.call('hasBuildingsForID', this._id);
		// return HasBuildings.findOne({ cookieId: "COOKIE", buildingId: parseInt(this._id) }).amount;
	},
	isEnabled: function () {
		return (this.affordable())?'enabled':'disabled';
	}
});


