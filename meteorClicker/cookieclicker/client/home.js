


Template.clicker.events ({
	"click #clickerup": function () {
		Cookies.update({
			_id: 1,
			$inc: {
				current: 1,
				total: 1
			}
		});
	}
});