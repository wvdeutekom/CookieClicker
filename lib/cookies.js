Cookies = new Mongo.Collection("cookies");
HasBuildings = new Mongo.Collection("hasBuildings");




if (Meteor.isServer) {
  Meteor.startup(function () {
  	if(Cookies.findOne({_id: "COOKIE"}) === undefined) {
  		Cookies.insert({
  			_id: "COOKIE",
  			total: 0,
  			current: 0,
  			buildings: {
  				collection: "hasBuildings",
  				via: "cookieId"
  			}
  		});
  	}
  	if(HasBuildings.find().count() === 0) {
  		HasBuildings.insert({
  			cookieId: "COOKIE",
  			buildingId: 1,
  			amount: 1
  		});
  	}
  });
}