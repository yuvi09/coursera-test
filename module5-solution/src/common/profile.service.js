(function () {
    "use strict";

    angular.module('common')
    .service('ProfileService', ProfileService);

   // ProfileService.$inject = ['firstName', 'lastName', 'phone'];
    function ProfileService () {
        var service = this;

        var isRegistered = false;

        

         var profile = {
            firstName:"",
            lastName:"", 
            email: "",
            phone: "",
            favMenuItem: ""
        };

        service.saveProfileInfo = function (userProfile) {
           

            profile.firstName = userProfile.firstName;
            profile.lastName = userProfile.lastName;
            profile.phone = userProfile.phone;
            profile.favMenuItem = userProfile.favMenuItem;

            isRegistered = true;
        };

        service.getProfileInfo = function () {
            
            return profile;
        };
        
        service.isRegistered = function () {
            return isRegistered;
        };
    }

})();