define([
    'angular',
    'config',
  ],
  function (angular, config) {
    var module = angular.module(config.name + '.routes', []);

    module.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
      // 切换显示方式为ios
      $ionicConfigProvider.views.transition('ios');
      $ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
      $ionicConfigProvider.navBar.alignTitle("center");
      $ionicConfigProvider.tabs.position('bottom');
      $ionicConfigProvider.tabs.style('standard');

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
        .state('main.home', {
          url: '/home',
          views: {
            'tab1': {
              templateUrl: 'templates/main/home.html',
              controller: 'homeCtrl'
            }
          }
        })
        .state('main.car', {
          url: '/car',
          views: {
            'tab2': {
              templateUrl: 'templates/main/car.html',
              controller: 'carCtrl'
            }
          }
        })
        .state('main.sell', {
          url: '/sell',
          views: {
            'tab3': {
              templateUrl: 'templates/main/sell.html',
              controller: 'sellCtrl'
            }
          }
        })
        .state('main.user', {
          url: '/user',
          views: {
            'tab4': {
              templateUrl: 'templates/main/user.html',
              controller: 'userCtrl'
            }
          }
        })
        .state('main', {
          url: '/main',
          abstract: true,
          templateUrl: 'templates/main/main.html'
        })
      ;

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/main/home');
    });
  }
);


