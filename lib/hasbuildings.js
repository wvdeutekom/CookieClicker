HasBuildings = new Mongo.Collection("hasBuildings");
if (Meteor.isServer) {
  	Meteor.startup(function () {
	  	if(HasBuildings.findOne({cookieId: "COOKIE", buildingId: 1}) === undefined) {
	  		HasBuildings.insert({
	  			cookieId: "COOKIE",
	  			buildingId: 1,
	  			amount: 0
	  		});
	  	}
	  	if(HasBuildings.findOne({cookieId: "COOKIE", buildingId: 2}) === undefined) {
	  		HasBuildings.insert({
	  			cookieId: "COOKIE",
	  			buildingId: 2,
	  			amount: 0
	  		});
	  	}
	  	if(HasBuildings.findOne({cookieId: "COOKIE", buildingId: 3}) === undefined) {
	  		HasBuildings.insert({
	  			cookieId: "COOKIE",
	  			buildingId: 3,
	  			amount: 0
	  		});
	  	}
	  	if(HasBuildings.findOne({cookieId: "COOKIE", buildingId: 4}) === undefined) {
	  		HasBuildings.insert({
	  			cookieId: "COOKIE",
	  			buildingId: 4,
	  			amount: 0
	  		});
	  	}
  	});
}