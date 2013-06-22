//Collections
Beers = new Meteor.Collection('beers');
Brewers = new Meteor.Collection('brewers');
Inventory = new Meteor.Collection('inventory');


if (Meteor.isClient) {

  Session.setDefault('selectedBeers', []);

  Template.inventory.stock = function(){
      return Inventory.find({in_stock: true});
  };

  Template.inventory.events({
      "click input.add" : function() {
          Inventory.insert({name: "Added", in_stock: true});
      },
  });

  //Helper Function to add/remove from the selection list
  function selectedBeerIndex(id){
          var selectedList = Session.get('selectedBeers');
          console.log("List: ");
          console.log(selectedList);
          console.log("Selected List Lenght: " + selectedList.length);

          try{
              for(var index =0; index < selectedList.length; index++){
                  if (selectedList[index] == id)
                      return index;

              }
          }
          catch(err){
              console.log("Error!: ");
              console.log(err);
          }

          return -1;
  };

  Template.beer.events({
      "click" : function() {
          console.log("Clicked a beer: " + this.name );
          var index = selectedBeerIndex(this._id);
          var list = Session.get('selectedBeers');

          if(index >= 0){
            list.splice(index,1);
          }
          else{
              list.push(this._id);
          }
          Session.set('selectedBeers', list);
      }
  });

  Template.beer.selected = function(){
      //console("Selected: " + this.selected);
      
      return selectedBeerIndex(this._id) >=0 ? "selected" : '';
  };

  
  Template.newBeer.brewery = function(){
      return Brewers.find({});
  };

  Template.newBeer.events({
      "click input.add": function(){
          console.log("Adding beer")
          console.log(this.name);
          console.log(this);
          console.log(this._id);
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
