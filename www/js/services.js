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

.factory('Musics', function() {

  // Some fake testing data
  var musics = [];
  var selected = [];

  _(100).times(function(i) {
    var music = randomMusic();
    music.id = i;
    musics.push(music);
  });

  selected.push(musics[0]);
  selected.push(musics[1]);
  selected.push(musics[2]);

  return {
    all: function() {
      return musics;
    },
    remove: function(chat) {
      musics.splice(musics.indexOf(chat), 1);
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
      selected = _.uniq(selected, function(item) { return item.id });
      console.log(selected);
    },
    unselect: function(music) {
      selected = _.reject(selected, function(m) { return m.id === music.id })
    },
    clearSelected: function() {
      selected = [];
    }
  }
})

.factory('Selections', function(Musics) {
  var selections = [];

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

  return {
    all: function() {
      return selections;
    },
    get: function(id) {
      return _.find(selections, function(s) {
        return s.id == id;
      });
    }
  }

});
