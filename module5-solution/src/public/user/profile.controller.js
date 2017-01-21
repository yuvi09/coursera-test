(function () {
"use strict";

angular.module('public')
.controller('ProfileController', ProfileController);

ProfileController.$inject = ['ProfileService', 'MenuService', 'ApiPath'];
function ProfileController(ProfileService, MenuService, ApiPath) {
  var reg = this;

  var profile = {};
  var profileIsRegistered = false;
  var isFavMenuNumberValid = false;

  reg.basePath = ApiPath;

  reg.submit = function () {
      reg.completed = true;
      profile.firstName = reg.user.firstname;
      profile.lastName = reg.user.lastname;
      profile.email = reg.user.email;
      profile.phone = reg.user.phone;

      //Validate Menu Number
      //MenuService.validateMenuNumber(reg.user.favmenunumber);
      
      var promise = MenuService.getMenuItem(profile.favMenuItem);

          promise.then(function (response) {
              reg.menuItemFound = true;
              //console.log("reg.menuItemDetail", reg.menuItemDetail);
              
          })
          .catch (function (error) {
              reg.menuItemFound = false;
              console.log("GetMenuItem Failed");
          });

      profile.favMenuItem = reg.user.favmenunumber;
      //ProfileService.saveProfileInfo(reg.user.firstname, "Dodia", "2223334455");
      ProfileService.saveProfileInfo(profile);
  };

  profile = ProfileService.getProfileInfo();
  profile.isRegistered = ProfileService.isRegistered();

  if (profile !== undefined && profile.isRegistered === true) {
      reg.profile = profile;
      if (profile.favMenuItem !== undefined && profile.favMenuItem !== "") {
          
          var promise = MenuService.getMenuItem(profile.favMenuItem);

          promise.then(function (response) {
              reg.menuItem = response;
              //console.log("reg.menuItemDetail", reg.menuItemDetail);
              
          })
          .catch (function (error) {
              console.log("GetMenuItem Failed");
          });

          //reg.menuItemDetail = MenuService.getMenuItem(profile.favMenuItem);
      }
      
  }
  

  
}


})();