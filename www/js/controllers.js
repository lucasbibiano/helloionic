angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('MusicsCtrl', function($scope, Musics) {
  $scope.groupedMusics = _.groupBy(Musics.all(), function (music) {
    return music.name[0];
  });

  $scope.remove = function(music) {
    Musics.remove(music);
  };

  $scope.select = function(music) {
    Musics.select(music);
  };
})

.controller('ChooseCtrl', function($scope, Friends) {
  $scope.musics = Musics.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
