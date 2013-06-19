//Collections
Beers = new Meteor.Collection('beers');
Brewers = new Meteor.Collection('brewers');
Inventory = new Meteor.Collection('inventory');


if (Meteor.isClient) {

  Template.inventory.stock = function(){
      return Inventory.find({in_stock: true});
  };

  Template.inventory.events({
      "click input.add" : function() {
          Inventory.insert({name: "Added", in_stock: true});
      },
  });

  Template.beer.events({
      "click" : function() {
          console.log("Clicked a beer");
          this.selected = !this.selected;
          this.selected = true;
      }
  });

  
  Template.newBeer.brewery = function(){
      return Brewers.find({});
  };

  Template.newBeer.events({
      "click input.add": function(){
          console.log("Adding beer")
          console.log(this.name);
          //Beers.insert({name: this.name, brewery: "nullz" });
      }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    //Default Data
    if(Beers.find().count() == 0){
        var tempBeers = [ "Temp1",
                          "Temp2",
                          "Temp3"]

      for(var count=0; count < tempBeers.length; count++){
        Beers.insert({name: tempBeers[count], brewer: "None"});
        Inventory.insert({name: tempBeers[count], in_stock: true});

        console.log("Setting up default Beer");
      };
    }

    console.log("Server Setup Done");
  });
}
