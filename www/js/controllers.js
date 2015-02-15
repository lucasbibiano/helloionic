Array.prototype.getIndexBy = function (name, value) {
  for (var i = 0; i < this.length; ++i) {
    if (this[i][name] == value) {
      return i;
    }
  }

  return -1;
}

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('MusicsCtrl', function($scope, $ionicActionSheet, $window, $ionicModal, Musics, Selections) {
  $scope.musics = [];
  $scope.selected = Musics.selected();

  Musics.all().then(function(musics) {
    angular.copy(_.sortBy(musics, function(music) {
      return music.name;
    }), $scope.musics);
  });

  $scope.$on('add', function(event, music) {
    var idx = $scope.musics.getIndexBy("id", music.id);

    if (music.type != "music") return;

    if (idx == -1)
      $scope.musics.push(music);
    else
      $scope.musics[idx] = music;

    angular.copy(_.sortBy($scope.musics, function(music) {
      return music.name;
    }), $scope.musics);
  });
 
  $scope.$on('delete', function(event, id) {
    var idx = $scope.musics.getIndexBy("id", id);

    if (idx != -1)
      $scope.musics.splice(idx, 1);
  });

  $ionicModal.fromTemplateUrl('templates/music-form.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true,
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.musicForm = function(music) {
    $scope.modal.music = angular.copy(music);
    $scope.modal.show();
  };

  $scope.submitMusic = function(music) {
    $scope.modal.music.lastPlayed = new Date();
    $scope.modal.music.tags = _.map($scope.modal.music.tags, function(m) { return m.text; }); 
    Musics.add($scope.modal.music);
    $scope.modal.hide();
  };

  $scope.clearSelected = function() {
    Musics.clearSelected();
  };

  $scope.remove = function(music) {
    Musics.remove(music);
  };

  $scope.isSelected = function(music) {
    if (music == undefined)
      return false;

    return _.find($scope.selected, function(m) { return m.id == music.id; }) != undefined;
  };

  $scope.unselect = function(music) {
    console.log(music.id);
    Musics.unselect(music);
  };

  $scope.confirmSelection = function(selection) {
    var musicsSelected = angular.copy(_.map($scope.selected, function(s) {
      return s.name;
    }));
    selection.musics = musicsSelected;

    Selections.add(selection);
    Musics.clearSelected();

    selection = {};

    $window.location.href = "#/tab/selections";
  }

  $scope.showOpts = function(music) {
    var buttons = [];

    if (this.isSelected(music)) {
      buttons.push({ text: 'Deselecionar' })
    }
    else {
      buttons.push({ text: 'Selecionar' })
    }

    buttons.push({ text: 'Editar' });
    buttons.push({ text: 'Detalhes' });

    $ionicActionSheet.show({
      buttons: buttons,
      destructiveText: 'Remover',
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
        } 
        else if (index == 1) {
          $scope.musicForm(music);
        }
        else if (index === 2) {
          $window.location.href = '#/tab/musics/' + music.id;
        }

        return true;
      },
      destructiveButtonClicked: function() {
        Musics.remove(music);
        return true;
      }
    });
  };

  $scope.toggleSelection = function(selection) {
    if ($scope.isSelectionShown(selection)) {
      $scope.shownSelection = null;
    } else {
      $scope.shownSelection = selection;
    }
  };
  $scope.isSelectionShown = function(selection) {
    return $scope.shownSelection === selection;
  };
})

.controller('BadgesCtrl', function($scope, Musics) {
  $scope.selectedCount = function() { return Musics.selected().length.toString(); };
})

.controller('SelectionsCtrl', function($scope, Selections) {
  $scope.selections = [];

  Selections.all().then(function(selections) {
    angular.copy(_.sortBy(selections, function(s) {
      return -s.date;
    }), $scope.selections);
  });

  $scope.$on('add', function(event, selection) {
    var idx = $scope.selections.getIndexBy("id", selection.id);

    if (selection.type != "selection") return;

    if (idx == -1)
      $scope.selections.push(selection);
    else
      $scope.selections[idx] = selection;

    angular.copy(_.sortBy($scope.selections, function(selection) {
      return selection.name;
    }), $scope.selections);
  });
 
  $scope.$on('delete', function(event, id) {
    var idx = $scope.selections.getIndexBy("id", id);

    if (idx != -1)
      $scope.selections.splice(idx, 1);
  });

  $scope.toggleSelection = function(selection) {
    if ($scope.isSelectionShown(selection)) {
      $scope.shownSelection = null;
    } else {
      $scope.shownSelection = selection;
    }
  };
  $scope.isSelectionShown = function(selection) {
    return $scope.shownSelection === selection;
  };
})

.controller('SelectionCtrl', function($scope, $stateParams, Selections) {
  Selections.get($stateParams.selectionId).then(function(data) {
    $scope.selection = data;
  });
});
