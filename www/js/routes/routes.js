define([
    'angular',
    'config',
  ],
  function (angular, config) {
    var module = angular.module(config.name + '.routes', []);

    module.config(function ($stateProvider, $urlRouterProvider) {
      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'loginCtrl'
        })
        .state('signup', {
          url: '/signup',
          templateUrl: 'templates/signup.html',
          controller: 'signupCtrl'
        })
        //.state('main.home', {
        //  url: '/home',
        //  views: {
        //    'tab1': {
        //      templateUrl: 'templates/home.html',
        //      controller: 'homeCtrl'
        //    }
        //  }
        //})
        //.state('main.car', {
        //  url: '/car',
        //  views: {
        //    'tab2': {
        //      templateUrl: 'templates/car.html',
        //      controller: 'carCtrl'
        //    }
        //  }
        //})
        //.state('main.setting', {
        //  url: '/setting',
        //  views: {
        //    'tab3': {
        //      templateUrl: 'templates/setting.html',
        //      controller: 'siteCtrl'
        //    }
        //  }
        //})
        //.state('main', {
        //  url: '/main',
        //  abstract: true,
        //  templateUrl: 'templates/main.html'
        //})
      ;

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/login');
    });
  }
);


