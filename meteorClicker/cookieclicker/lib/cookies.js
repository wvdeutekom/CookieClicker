Cookies = new Mongo.Collection("cookies");




if (Meteor.isServer) {
  Meteor.startup(function () {
  	if(Cookies.findOne({_id: "COOKIE"}) === undefined) {
  		Cookies.insert({
  			_id: "COOKIE",
  			total: 0,
  			current: 0
  		});
  	}
  });
}