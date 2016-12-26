(function () {
    'use strict';

    angular.module('LunchCheck', [])

    .controller('LunchCheckController', LunchCheckController);
    
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.CheckIfTooMuch = function () {
            if ($scope.textValue == "") {
                $scope.displayMessage = "Please enter data first";
            }
            else {

                var totalItemsEntered = getTotalItemsEntered($scope.textValue);
                    

                if (totalItemsEntered > 3 ) {
                    $scope.displayMessage = " You are eating too much !";
                }
                else if (totalItemsEntered == 0) {
                    $scope.displayMessage = "Please enter data first";
                } 
                else {
                    $scope.displayMessage = "Enjoy";
                }
            }
            
        };

        function getTotalItemsEntered(enteredText) {
             
            var itemCount = 0;
            
            if (enteredText != undefined)
            {
                itemCount = enteredText.split(',').length;
    
            }
            return itemCount;        
        }      
    }


})();