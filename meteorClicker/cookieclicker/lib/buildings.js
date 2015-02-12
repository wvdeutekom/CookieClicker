Buildings = new Mongo.Collection("buildings");

// 0.1
// 0.5
// 2.0
// 5.0
// 10.0
// 50


// var rolstoeler 

// var invalide

// var fabriek

// var zwartGat

// var jostiband



if (Meteor.isServer) {
  Meteor.startup(function () {
  	if(Buildings.find().count() === 0) {
  		Buildings.insert({
  			_id: "1",
  			name: "rolstoeler",
  			cost: 15,
  			income: 0.1,
  		});
  	}
  });
}