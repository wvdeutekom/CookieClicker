Template.clicker.events ({
	"click #clickerup": function () {
		if(Meteor.user()){
			var squad = Squad.findOne({_id: Meteor.user().squadId});
		} else {
			var squad = Squad.findOne({name: "Anonymous"});
		}
		Squad.update({_id: squad._id}, {
			$inc: {
				cookies_current: 1,
				cookies_total: 1
			}
		});
	}
});

Template.clicker.helpers ({
	counter: function () {
		if(Meteor.user()){
			var squad = Squad.findOne({_id: Meteor.user().squadId});
		} else {
			var squad = Squad.findOne({name: "Anonymous"});
		}
		return squad.cookies_current;
	},
	total: function () {
		if(Meteor.user()){
			var squad = Squad.findOne({_id: Meteor.user().squadId});
		} else {
			var squad = Squad.findOne({name: "Anonymous"});
		}
		return squad.cookies_total;
	},
	income: function () {
		var amount = 0;
		if(Meteor.user()){
			var squad = Squad.findOne({_id: Meteor.user().squadId});
		} else {
			var squad = Squad.findOne({name: "Anonymous"});
		}
		for(var i in squad.buildings) {
		  	amount += Math.round(squad.buildings[i].amount * Buildings.findOne({_id: squad.buildings[i].buildingId}).income);
		}
		return amount;
	}
});

Template.store.helpers ({
	buildings: function () {
		return Buildings.find();
	}
});
Template.building.events ({
	"click .building-buy-button": function () {
		if(Meteor.user()){
			var squad = Squad.findOne({_id: Meteor.user().squadId});
		} else {
			var squad = Squad.findOne({name: "Anonymous"});
		}
		if(squad.cookies_current >= this.cost){
			console.log('buy '+this.name);
			// squad.update({_id: squad._id},{
			// 	$inc: {
			// 		cookies_current: -this.cost
			// 	}
			// });
		}
	}
});
Template.building.helpers ({
	hasBuildings: function () {
		if(Meteor.user()){
			var squad = Squad.findOne({_id: Meteor.user().squadId});
		} else {
			var squad = Squad.findOne({name: "Anonymous"});
		}
		for(var i in squad.buildings) {
			if(squad.buildings[i].buildingId == this._id){
				return squad.buildings[i].amount;
			}
		}
	},
	isBuyEnabled: function () {
		return (this.affordable())?'enabled':'disabled';
	},
	isSellEnabled: function () {
		return (this.sellable())?'enabled':'disabled';
	}
});



// At the bottom of the client code
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

// // Support for playing D&D: Roll 3d6 for dexterity
// Accounts.onCreateUser(function(options, user) {

// 	window.alert("onCreateUser");

// 	UIkit.notify('achievement: looks like you did it bro.', 'succes');
// 	// We still want the default hook's 'profile' behavior.
// 	if (options.profile)
// 	user.profile = options.profile;
// 	return false;
// });

// Accounts.onLogin(function() {
	// window.alert("onLogin");
	// UIkit.notify('welcome back', 'succes');
// });
// Accounts.onLogin(function(user) {
	// window.alert("onLogin");
	// UIkit.notify('welcome back', 'succes');
// });