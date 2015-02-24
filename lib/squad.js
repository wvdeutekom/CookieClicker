Squad = new Mongo.Collection("squad");

if (Meteor.isClient) {
	function joinSquad(id, code) {
		console.log('Join '+id);
		var squad = Squad.findOne({_id: id});
		if (squad.private == 0 || squad.private == 1 && squad.code == code){
			Meteor.users.update({ _id: Meteor.userId() }, { $set: { squadId: squadId } });
			UIkit.notify("<i class='uk-icon-users'></i> You've joined a squad", 'success');
		} else {
			UIkit.notify("<i class='uk-icon-users'></i> Failed to join a squad", 'danger');
		}
	}
}

if (Meteor.isServer) {
  	Meteor.startup(function () {
	    if(Squad.findOne({name: "Anonymous"}) === undefined) {
	    	Meteor.call('createSquad', "Anonymous");
	    }
		var incomeInterval = Meteor.setInterval(function(){ Meteor.call('applyIncome'); }, 1000);
	});	
}