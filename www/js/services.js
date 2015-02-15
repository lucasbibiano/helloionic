angular.module('starter.services', [])

.factory('Pouch', function($rootScope) {

  var db = new PouchDB('musicapp');
  var remoteCouch = false;

  db.changes({
    continuous: true,
    onChange: function(change) {
      if (!change.deleted) {
        $rootScope.$apply(function() {
          db.get(change.id, function(err, doc) {
            $rootScope.$apply(function() {
              if (err) console.log(err);
              $rootScope.$broadcast('add', doc);
            })
          });
        })
      } 
      else {
        $rootScope.$apply(function() {
          $rootScope.$broadcast('delete', change.id);
        });
      }
    }
  });

  return {
    db: function() {
      return db;
    }
  };
})

.factory('Musics', function($q, Pouch) {

  var musics = [];
  var selected = [];
  var db = Pouch.db();

  return {
    all: function() {
      var deferred = $q.defer();

      db.allDocs({include_docs: true}, function(err, response) {
        if(err){
          deferred.reject(err);
        } else {
          var result = _.filter(
            _.map(response.rows, function(m) { return m.doc; }), function(m) {
              return m.type == "music";
            }
          );
          deferred.resolve(result);
        }
      });  

      return deferred.promise;    
    },
    add: function(music) {
      if (music.id == undefined || music.id == null) {
        music.id = "" + (Date.now() / 1000 | 0);
        music.type = "music";
      }

      music.rev = "" + (Date.now() / 1000 | 0);

      db.put(music, music.id, function callback(err, result) { console.log(err); });
    },
    remove: function(music) {
      db.get(music.id).then(function(doc) {
        return db.remove(doc);
      })
      .catch(function(err){
        console.log(err);
      });
    },
    get: function(musicId) {
      for (var i = 0; i < musics.length; i++) {
        if (musics[i].id === parseInt(musicId)) {
          return musics[i];
        }
      }
      return null;
    },
    selected: function() {
      return selected;
    },
    select: function(music) {
      selected.push(music);
    },
    unselect: function(music) {
      selected.splice(selected.getIndexBy('id', music.id), 1);
    },
    clearSelected: function() {
      selected.length = 0;
    }
  }
})

.factory('Selections', function($q, Pouch, Musics) {
  var selections = [];
  var db = Pouch.db();

/*  _(10).times(function(i) {
    var selection = { 
      date: randomDate(new Date(2012, 0, 1), new Date()),
      name: randomPhrase(Math.floor((Math.random() * 5) + 1)),
      id: i
    };

    selection.musics = [];

    selection.musics = _.sample(Musics.all(), 6);

    selections.push(selection);
  });

  var i = 10;*/

  return {
    all: function() {
      var deferred = $q.defer();

      db.allDocs({include_docs: true}, function(err, response) {
        if(err){
          deferred.reject(err);
        } else {
          var result = _.filter(
            _.map(response.rows, function(s) { return s.doc; }), function(s) {
              return s.type == "selection";
            }
          );

          console.log(result);
          deferred.resolve(result);
        }
      });

      return deferred.promise;   
    },
    add: function(selection) {
      if (selection.id == undefined || selection.id == null) {
        selection.id = "" + (Date.now() / 1000 | 0);
        selection.type = "selection";
      }

      selection.rev = "" + (Date.now() / 1000 | 0);

      db.put(selection, selection.id, function callback(err, result) { console.log(err); });
    },
    remove: function(selection) {
      db.get(selection.id).then(function(doc) {
        return db.remove(doc);
      })
      .catch(function(err){
        console.log(err);
      });
    },
    get: function(id) {
      var deferred = $q.defer();

      db.get(id).then(function(doc) {
        deferred.resolve(doc);  
      });

      return deferred.promise;
    }
  }

});
