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
		} else if(squad.private == 0) 
			User.update({
				_id: Meteor.userId()
			},{
				squadId: squad._id
			});
			UIkit.notify('You joined a squad!','success');
		}
	}
}

function createSquad() {
	var squad = {
			cookies_total: 0,
			cookies_current: 0,
			private: 0,
			code: '',
			admin: Meteor.userId(),
			buildings: []
		};
		Buildings.find().forEach(function(building) {
	  	squad.buildings.push({
	  		buildingId: building._id,
	  		amount: 0
	  	});
	});
	Squad.insert(squad, function(error, id){
		return id;
	});
}

if (Meteor.isServer) {
  	Meteor.startup(function () {
	    if(Squad.findOne({name: 'Anonymous'}) === undefined) {
  			Squad.update({
  				_id: createSquad()
  			},{
  				name: 'Anonymous'
  			});
	    }
	}
}