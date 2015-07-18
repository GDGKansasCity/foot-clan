// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])

.factory('Villians', ['$firebaseArray', function($firebaseArray) {
  var villiansRef = new Firebase('http://foot-clan.firebaseio.com/villians');
  return $firebaseArray(villiansRef);
}])

.controller('ListCtrl', function($scope, $ionicListDelegate, Villians) {
  $scope.villians = Villians;
  
  $scope.addVillian = function() {
    var name = prompt('What TMNT villian would you like to add to the Foot Clan?');
    if (name) {
      $scope.villians.$add({
        'name': name
      });
    }
  };
  
  $scope.defeated = function(villian) {
    var villianRef = new Firebase('http://foot-clan.firebaseio.com/villians/' + villian.$id);
    villianRef.child('status').set('defeated');
    $ionicListDelegate.closeOptionButtons();
  };
})