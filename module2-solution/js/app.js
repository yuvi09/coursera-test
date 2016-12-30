(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ToBuyController', ToBuyController)
.controller('BoughtController', BoughtController)
.service('ShoppingListService', ShoppingListService);

//ToBuyController
ToBuyController.$inject = ['ShoppingListService'];
function ToBuyController(ShoppingListService) {
    var toBuyList = this;    
    
    toBuyList.itemsToBuy = ShoppingListService.retrieveItemsToBuy();
    toBuyList.removeItem = function (itemIndex) {
        ShoppingListService.removeItem(itemIndex);
    };
    toBuyList.addRemoveItem = function (itemName, itemQuantity, itemIndex) {
        ShoppingListService.addRemoveItem(itemName, itemQuantity, itemIndex);
    };
}

//BoughtController
BoughtController.$inject = ['ShoppingListService'];
function BoughtController(ShoppingListService) {
    var boughtList = this;

    boughtList.itemsBought = ShoppingListService.retrieveItemsBought();
}


//ShoppingListService 
function ShoppingListService() {
    
    // TODO: Implement MaxItems

    var service = this;

    //List for shopping items
    var shoppingItems = [
        {
            name: "Cilantro Bunch",
            quantity: 1
        },
        {
            name: "Onions",
            quantity: 2
        },
        {
            name: "Jalapenos",
            quantity: 3
        },
        {
            name: "Avocados",
            quantity: 5
        },
        {
            name: "Limes",
            quantity: 5
        },
        {
            name: "Tomatoes",
            quantity: 5
        }
    ];

    //List for bought items
    var boughtItems = [];

    //add item to BoughtList and remove it from ShoppingList
    service.addRemoveItem = function(itemName, itemQuantity, itemIndex) {
        var shoppingItem = {
            name: itemName,
            quantity: itemQuantity
        };
        boughtItems.push(shoppingItem);
        shoppingItems.splice(itemIndex, 1);
    };

    //Code to remove item from List - Testing Only
    service.removeItem = function (itemIndex) {
        shoppingItems.splice(itemIndex,1);
    };

    //code to retrieve items to buy 
    service.retrieveItemsToBuy = function () {
        return shoppingItems; 
    };

    //code to retrieve items already bought 
    service.retrieveItemsBought = function () {
        return boughtItems; 
    };
}


}) ();
