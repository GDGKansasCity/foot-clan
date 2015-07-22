// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])

.factory('Villains', ['$firebaseArray', function($firebaseArray) {
  var villainsRef = new Firebase('http://foot-clan.firebaseio.com/villains');
  return $firebaseArray(villainsRef);
}])

.controller('ListCtrl', function($scope, $ionicListDelegate, Villains) {
  $scope.villains = Villains;
  
  $scope.addVillain = function() {
    var name = prompt('What TMNT villain would you like to add to the Foot Clan?');
    if (name) {
      $scope.villains.$add({
        'name': name
      });
    }
  };
  
  $scope.defeated = function(villain) {
    var villainRef = new Firebase('http://foot-clan.firebaseio.com/villains/' + villain.$id);
    villainRef.child('status').set('defeated');
    $ionicListDelegate.closeOptionButtons();
  };
})