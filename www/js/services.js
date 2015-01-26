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
    tags: arr
  }
}

angular.module('starter.services', [])

.factory('Musics', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var musics = []

  _(100).times(function() {
    musics.push(randomMusic());
  });

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
    }
  }
})

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});
