angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('MusicsCtrl', function($scope, $ionicActionSheet, $window, Musics) {

  $scope.groupedMusics = _.groupBy(Musics.all(), function(music) {
    return music.name[0];
  });

  $scope.clearSelected = function() {
    Musics.clearSelected();
  };

  $scope.selected = function() { return Musics.selected(); };

  $scope.remove = function(music) {
    Musics.remove(music);
  };

  $scope.isSelected = function(music) {
    return _.find(Musics.selected(), function(m) { return m.id == music.id }) != undefined;
  };

  $scope.showOpts = function(music) {
    var buttons = [];

    if (this.isSelected(music)) {
      buttons.push({ text: 'Deselecionar' })
    }
    else {
      buttons.push({ text: 'Selecionar' })
    }

    buttons.push({ text: 'Detalhes' });

    $ionicActionSheet.show({
      buttons: buttons,
      destructiveText: 'Destruir',
      titleText: 'Ações para ' + music.name,
      cancelText: 'Cancelar',
      buttonClicked: function(index) {

        if (index === 0) {
          if (buttons[0].text == "Selecionar") {
            Musics.select(music);
          }
          else {
            Musics.unselect(music);
          }
        } else if (index === 1) {
          $window.location.href = '#/musics/' + music.id;
        }

        return true;
      },
      destructiveButtonClicked: function() {
        return true;
      }
    });
  }
})

.controller('BadgesCtrl', function($scope, Musics) {
  $scope.selectedCount = function() { return Musics.selected().length.toString(); };
});
