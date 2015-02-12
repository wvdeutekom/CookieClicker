HasBuildings = new Mongo.Collection("hasBuildings");
if (Meteor.isServer) {
  Meteor.startup(function () {
  	if(HasBuildings.find().count() === 0) {
  		HasBuildings.insert({
  			cookieId: "COOKIE",
  			buildingId: 1,
  			amount: 1
  		});
  	}
  });
}