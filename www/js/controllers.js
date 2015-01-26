angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('MusicsCtrl', function($scope, Musics) {
  $scope.musics = Musics.all();
  $scope.remove = function(music) {
    Musics.remove(music);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});