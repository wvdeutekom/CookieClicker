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
		return Cookies.find({_id: "COOKIE"});
	}
})