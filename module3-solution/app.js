(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems', FoundItemsDirective);

    //define controller
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService){
        var nidCtrl = this;

        nidCtrl.found = []; 
        
        nidCtrl.narrowButton = function (searchTerm) {
            if (searchTerm === undefined || searchTerm === "") {
                nidCtrl.error = true;
                
            }
            else {
                var promise = MenuSearchService.getMatchedMenuItem(searchTerm);
                nidCtrl.waiting = true;
                
                promise.then(function (response) {
                    if (response === undefined || response.length === 0 ) {
                        nidCtrl.error = true;
                        //console.log("nidCtrl.error :" + nidCtrl.error);
                    }
                    else {
                        nidCtrl.error = false;
                    }
                    nidCtrl.waiting = false;
                    nidCtrl.found = response;
                })
                .catch(function (error) {
                    console.log("Something went terribly wrong.");
                });

            }
        
            
        };

        nidCtrl.removeItem = function (itemIndex) {
            //console.log("Removing Item with index :" + itemIndex);
            nidCtrl.found.splice(itemIndex, 1);
        };

    }

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'foundItemsList',
            bindToController: true
        };
        return ddo;
    }



    function FoundItemsDirectiveController() {
        var foundItemsList = this;

    }


    //MenuSearchService definition
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
    
        //service to get all menu items. does not do any filtering. not in use.
        service.getMenuItems = function () {
            var response = $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json")
            });
            return response;
        };


        service.getMatchedMenuItem = function(searchTerm) {
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (result) {
                var foundItems = [];
            
                for (var i=0; i<result.data.menu_items.length; i++) {
                    if (result.data.menu_items[i].description.indexOf(searchTerm) !== -1){
                        foundItems.push(result.data.menu_items[i]);
                    }
                }
                return foundItems;
            });
            return response;
        };
    }


}) ();