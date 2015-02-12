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
    if(Buildings.findOne({_id: "1"}) === undefined) {
  		Buildings.insert({
  			_id: "1",
  			name: "rolstoeler",
  			cost: 15,
  			income: 0.1,
  		});
    }

    if(Buildings.findOne({_id: "2"}) === undefined) {
      Buildings.insert({
        _id: "2",
        name: "invalide",
        cost: 25,
        income: 0.4,
      });
    }

    if(Buildings.findOne({_id: "3"}) === undefined) {
      Buildings.insert({
        _id: "3",
        name: "fabriek",
        cost: 45,
        income: 0.65,
      });
    }

    if(Buildings.findOne({_id: "4"}) === undefined) {
      Buildings.insert({
        _id: "4",
        name: "zwartGat",
        cost: 105,
        income: 1.11,
      });
    }
  });
}
