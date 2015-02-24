Deps.autorun(function(){
  Meteor.subscribe('userData');
});

Template.home.events ({
	"click #createSquadButton": function () {
		Meteor.call('createSquad', $('#newSquadName').val(), function(error, squadId){
			if(error){
				UIkit.notify("<i class='uk-icon-users'></i> Failed to create a squad", 'danger');
			} else {
				Meteor.users.update({ _id: Meteor.userId() }, { $set: { squadId: squadId } });
				UIkit.notify("<i class='uk-icon-users'></i> You've created a squad", 'success');
			}
		});
	},
	"click .joinSquadButton": function () {
		joinSquad(this._id);
	}
});
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
		if(squad !== undefined){
			return Math.floor(squad.cookies_current);
		} else {
			return false;
		}
	},
	total: function () {
		if(Meteor.user()){
			var squad = Squad.findOne({_id: Meteor.user().squadId});
		} else {
			var squad = Squad.findOne({name: "Anonymous"});
		}
		if(squad !== undefined){
			return Math.floor(squad.cookies_total);
		} else {
			return false;
		}
	},
	income: function () {
		var amount = 0;
		if(Meteor.user()){
			var squad = Squad.findOne({_id: Meteor.user().squadId});
		} else {
			var squad = Squad.findOne({name: "Anonymous"});
		}
		if(squad !== undefined){
			for(var buildingId in squad.buildings) {
			  	amount += squad.buildings[buildingId] * Buildings.findOne({_id: buildingId}).income;
			}
		}
		return parseFloat(amount).toFixed(2);
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
		if(squad !== undefined){
			if(squad.cookies_current >= this.calcCost()){
				var increment = {
					cookies_current: -this.calcCost()	
				}
				increment["buildings."+this._id] = 1;
				Squad.update({_id: squad._id},{
					$inc: increment
				});
				UIkit.notify("<i class='uk-icon-user-plus'></i> You've hired " + this.name + "!", 'success');
			}
		}
	},
	"click .building-sell-button": function () {
		if(Meteor.user()){
			var squad = Squad.findOne({_id: Meteor.user().squadId});
		} else {
			var squad = Squad.findOne({name: "Anonymous"});
		}
		if(squad !== undefined && squad.buildings[this._id] > 0){
			var increment = {
				cookies_current: +this.calcCost()/2	
			}
			increment["buildings."+this._id] = -1;
			Squad.update({_id: squad._id},{
				$inc: increment
			});
			UIkit.notify("<i class='uk-icon-user-times'></i> You've sacked " + this.name + " and received cookies in return.", 'success');
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
		if(squad !== undefined){
			return squad.buildings[this._id];
		}
	},
	isBuyEnabled: function () {
		return (this.affordable())?'enabled':'disabled';
	},
	isSellEnabled: function () {
		return (this.sellable())?'enabled':'disabled';
	}
});


Template.squadSelection.helpers ({
	squads: function () {
		return Squad.find({ name: { $ne: "Anonymous" } });
	}
});

// UIkit.notify("<i class='uk-icon-check'></i> Message with an icon...");


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