define(
  [
    // Standard Libs
    'lodash',
    'angular',

    'config',
    'lang',

    // Other Standard Libes
    'ionic',
    'ionicAngular',
    'angularAnimate',
    'angularResource',
    'angularSanitize',
    'uiRouter',
  ],
  function (_, angular, config) {
    var dep_lib = [
      'ionic',
      config.name + '.controllers',
      config.name + '.routes',
      config.name + '.services',
      config.name + '.factories',
      config.name + '.directives',
      config.name + '.filters',
      'ngResource',
    ];

    //Ionic Starter App
    //
    //angular.module is a global place for creating, registering and retrieving Angular modules
    //'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
    //the 2nd parameter is an array of 'requires'
    //'starter.services' is found in services.js
    //'starter.controllers' is found in controllers.js
    var app = angular.module(config.name, dep_lib);

    app.run(function ($ionicPlatform) {
      $ionicPlatform.ready(function () {
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
    });

    // load the core components
    require([
      './routes/routes',
      './controllers/all',
      './directives/all',
      './filters/all',
      './factories/all',
      './services/all'
    ], function () {
      // bootstrap the app
      var $html,
        onDeviceReady = function () {
          config.local_url = config.l_dev_url;
          angular.bootstrap(document, dep_lib);
        };

      document.addEventListener("deviceready", onDeviceReady, false);

      if (typeof cordova === 'undefined') {
        config.local_url = config.l_web_url;
        $html = angular.element(document.getElementsByTagName('html')[0]);
        //$html.attr('ng-controller', 'appCtrl');
        angular.element().ready(function () {
          try {
            angular.bootstrap(document, [config.name]);
          } catch (e) {
            console.error(e.stack || e.message || e);
          }
        });
      }
    });
  }
);

