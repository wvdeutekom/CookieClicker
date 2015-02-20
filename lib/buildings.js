Buildings = new Mongo.Collection("buildings", {
  transform: function (building) {
    building.affordable = function(){
      if(Meteor.user()){
        return Squad.findOne({_id: Meteor.user().squadId}).cookie_current >= building.cost;
      } else {

      }
    };
    return building;
  },
});

if (Meteor.isServer) {
  Meteor.startup(function () {
    if(Buildings.findOne({_id: "1"}) === undefined) {
  		Buildings.insert({
        _id: "1",
        name: "Nicholas Cage",
        description: "Eventhough you know he'll be gone in 60 seconds.",
        image: "1.jpg",
        cost: 15,
        income: 0.1,
      });
    }

    if(Buildings.findOne({_id: "2"}) === undefined) {
      Buildings.insert({
        _id: "2",
        name: "Rambo",
        desciption: "This is what he does, who he is. Live for nothing, or die for something. Your call.",
        image: "2.jpg",
        cost: 25,
        income: 0.4,
      });
    }

    if(Buildings.findOne({_id: "3"}) === undefined) {
      Buildings.insert({
        _id: "3",
        name: "Jack Sparrow",
        desciption: "He's even got a jar of dirt!",
        image: "3.jpg",
        cost: 45,
        income: 0.65,
      });
    }

    if(Buildings.findOne({_id: "4"}) === undefined) {
      Buildings.insert({
        _id: "4",
        name: "Leon the professional",
        description: "He's a professional",
        image: "4.jpg",
        cost: 105,
        income: 1.11,
      });
    }
  });
}
