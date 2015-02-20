Squad = new Mongo.Collection("squad");

if (Meteor.isClient) {
	function joinSquad(id, code) {
		var squad = Squad.findOne({_id: id});
		if (squad.private == 1){
			if(squad.code == code){
				User.update({
					_id: Meteor.userId()
				},{
					squadId: squad._id
				});
				UIkit.notify('You joined a squad!','success');
			} else {
				UIkit.notify('You could not join the squad because the given code is invalid.','danger');
			}
		} else if(squad.private == 0) {
			User.update({
				_id: Meteor.userId()
			},{
				squadId: squad._id
			});
			UIkit.notify('You joined a squad!','success');
		}
	}
}

if (Meteor.isServer) {
  	Meteor.startup(function () {
	    if(Squad.findOne({name: 'Anonymous'}) === undefined) {
	    	Meteor.call('createSquad', function(err, response) {
	  			Squad.update({
	  				_id: response
	  			},{
	  				name: 'Anonymous'
	  			});
			});
	    }
	});
}