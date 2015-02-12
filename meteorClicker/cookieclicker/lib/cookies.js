Cookies = new Mongo.Collection("cookies");




if (Meteor.isServer) {
  Meteor.startup(function () {
  	if(Cookies.find().count() === 0) {
  		Cookies.insert({
  			_id: 1,
  			total: 0,
  			current: 0
  		});
  	}
  });
}