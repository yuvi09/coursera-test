(function () {
"use strict";

angular.module('public')
.controller('ProfileController', ProfileController);

ProfileController.$inject = ['ProfileService', 'MenuService'];
function ProfileController(ProfileService, MenuService) {
  var reg = this;

  var profile = {};

  var profileIsRegistered = false;

  reg.submit = function () {
      reg.completed = true;
      profile.firstName = reg.user.firstname;
      profile.lastName = reg.user.lastname;
      profile.email = reg.user.email;
      profile.phone = reg.user.phone;
      profile.favMenuItem = reg.user.favmenunumber;
      //ProfileService.saveProfileInfo(reg.user.firstname, "Dodia", "2223334455");
      ProfileService.saveProfileInfo(profile);
  };

  profile = ProfileService.getProfileInfo();
  profileIsRegistered = ProfileService.isRegistered();

  if (profile !== undefined && profileIsRegistered === true) {
      reg.profile = profile;
      if (profile.favMenuItem !== undefined && profile.favMenuItem !== "") {
          
          var promise = MenuService.getMenuItem(profile.favMenuItem);

          promise.then(function (response) {
              reg.menuItem = response;
              console.log("reg.menuItemDetail", reg.menuItemDetail);
              
          })
          .catch (function (error) {
              console.log("GetMenuItem Failed");
          });

          //reg.menuItemDetail = MenuService.getMenuItem(profile.favMenuItem);
      }
      
  }
  else {
      reg.message = "Not Signed Up Yet. Sign up Now!";
  }
  

  
}


})();