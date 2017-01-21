(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getMenuItem = function (shortName) {
    return $http.get(ApiPath + '/menu_items/' + shortName + '.json')
    .then(function (response) {
      return response.data;
    });

  };

  // service.getShortNames = function () {
  //   return $http.get(ApiPath + '/menu_items.json').then(function (response) {
  //     var shortNames = [];

  //     for(var i=0; i<response.data.menu_items.length; i++) {
  //       shortNames.push(response.data.menu_items[i].short_name);
  //     }
  //     return shortNames;
  //   });

  // };

}



})();
