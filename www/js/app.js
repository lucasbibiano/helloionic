// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngTagsInput', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.musics', {
    url: '/musics',
    views: {
      'tab-musics': {
        templateUrl: 'templates/tab-musics.html',
        controller: 'MusicsCtrl'
      }
    }
  })

  .state('tab.selected', {
    url: '/selected',
    views: {
      'tab-selected': {
        templateUrl: 'templates/tab-selected.html',
        controller: 'MusicsCtrl'
      }
    }
  })
    .state('tab.confirm-selection', {
      url: '/confirm',
      views: {
        'tab-selected': {
          templateUrl: 'templates/confirm-selection.html',
          controller: 'MusicsCtrl'
        }
      }
    })

  .state('tab.selections', {
    url: '/selections',
    views: {
      'tab-selections': {
        templateUrl: 'templates/tab-selections.html',
        controller: 'SelectionsCtrl'
      }
    }
  })
    .state('tab.selection-detail', {
      url: '/selections/:selectionId',
      views: {
        'tab-selections': {
          templateUrl: 'templates/selection-detail.html',
          controller: 'SelectionCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
