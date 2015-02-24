Squad = new Mongo.Collection("squad");

if (Meteor.isServer) {
  	Meteor.startup(function () {
	    if(Squad.findOne({name: "Anonymous"}) === undefined) {
	    	Meteor.call('createSquad', "Anonymous");
	    }
		var incomeInterval = Meteor.setInterval(function(){ Meteor.call('applyIncome'); }, 100);
	});	
}