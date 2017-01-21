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
      reg.completed = false;
      reg.menuItemFound = false;
      // check to see if the menu item entered by user exist
      var promise = MenuService.getMenuItem(reg.user.favmenunumber);
      promise.then(function (response) {
          reg.menuItemFound = true;
          profile.firstName = reg.user.firstname;
          profile.lastName = reg.user.lastname;
          profile.email = reg.user.email;
          profile.phone = reg.user.phone;
          profile.favMenuItem = reg.user.favmenunumber;
          ProfileService.saveProfileInfo(profile);
          reg.completed = true;
        })
        .catch (function (error) {
            reg.menuItemFound = false;
            console.log("GetMenuItem Failed");
        });

       
  };

  profile = ProfileService.getProfileInfo();
  profile.isRegistered = ProfileService.isRegistered();

  if (profile !== undefined && profile.isRegistered === true) {
      reg.profile = profile;
      if (profile.favMenuItem !== undefined && profile.favMenuItem !== "") {
          
          var promise = MenuService.getMenuItem(profile.favMenuItem);

          promise.then(function (response) {
              reg.menuItem = response;
          })
          .catch (function (error) {
              console.log("GetMenuItem Failed");
          });
      }
      
  }
  

  
}




})();