/** controller.js
*  The primary controller of our system. Links the front-end angular with NodeJS.
*  To reference this script, declare ng-app="nodesConnect" in the html tag and then
*  declare ng-controller="X", where X is the controller definition found below, in a tag
*  containing the necessary components.
*/


var app = angular.module('profhacks', []);

app.controller('formCtrl', function($scope, $http) {
  var token = window.location.hash.split('=')[1];
  $scope.update = function(data) {
    $scope.data = angular.copy(data);
  }
  $http.put('/mlh/user', {"token": token}).
    success(function(data) {
      $scope.update(data.data)
    }).error(function(data) {
      console.log(data);
    }).then(function() {
      console.log($scope);
    });
});