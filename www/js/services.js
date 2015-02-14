function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomWord(len) {
  var vowels = ['a', 'e', 'i', 'o', 'u'];
  var consts =  ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'qu', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z', 'tt', 'ch', 'sh'];

  var word = '';

  var is_vowel = false;

  var arr;

  for (var i = 0; i < len; i++) {

    if (is_vowel) arr = vowels
    else arr = consts
    is_vowel = !is_vowel;

    word += arr[Math.round(Math.random()*(arr.length-1))];
  }

  return word;
}

function randomPhrase(len) {
  var result = "";
  
  _(len).times(function() {
    result += randomWord(Math.floor((Math.random() * 10) + 1)) + " ";
  });

  return result;
}

function randomMusic() {
  var nTags = Math.floor((Math.random() * 10) + 1);
  var name = randomPhrase(Math.floor((Math.random() * 10) + 1));

  var arr = [];

  _(nTags).times(function() {
    arr.push(randomWord(Math.floor((Math.random() * 10) + 1)));
  });

  return {
    name: name,
    tags: arr,
    artist: randomPhrase(Math.floor((Math.random() * 5) + 1)),
    lastPlayed: randomDate(new Date(2012, 0, 1), new Date())
  }
}

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

  // Some fake testing data
  var musics = [];
  var selected = [];
  var db = Pouch.db();

  /*_(10).times(function(i) {
    var music = randomMusic();
    music.id = "" + i;
    music.rev = "" + (Date.now() / 1000 | 0);

    db.put(music, "" + i, function callback(err, result) { console.log(err); });
  });

  selected.push(randomMusic());
  selected.push(randomMusic());
  selected.push(randomMusic());*/

  return {
    all: function() {
      var deferred = $q.defer();

      db.allDocs({include_docs: true}, function(err, response) {
        if(err){
          deferred.reject(err);
        } else {
          deferred.resolve(_.map(response.rows, function(m) { return m.doc; }));
        }
      });  

      return deferred.promise;    
    },
    add: function(music) {
      if (music.id == undefined || music.id == null)
        music.id = "" + (Date.now() / 1000 | 0);

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

.factory('Selections', function(Musics) {
  var selections = selections || [];

  _(10).times(function(i) {
    var selection = { 
      date: randomDate(new Date(2012, 0, 1), new Date()),
      name: randomPhrase(Math.floor((Math.random() * 5) + 1)),
      id: i
    };

    selection.musics = [];

    selection.musics = _.sample(Musics.all(), 6);

    selections.push(selection);
  });

  var i = 10;

  return {
    all: function() {
      return selections;
    },
    get: function(id) {
      return _.find(selections, function(s) {
        return s.id == id;
      });
    },
    add: function(s) {
      s.id = i;
      i += 1;
      selections.push(s);
    }
  }

});
