/**
 * Created by gaojun on 15/11/26.
 */

define([
    'config'
  ],
  function (config) {
    'use strict';

    return ['$scope', '$rootScope', '$state',
      function ($scope, $rootScope, $state) {
        $rootScope.config = config;

        $scope.$on('event:auth-loginRequired', function (e, rejection) {
          console.log('handling login required');
          $state.go('login', {});
        });

        $scope.$on('event:auth-loginConfirmed', function () {
          $scope.username = null;
          $scope.password = null;
          $state.go('main.home', {});
        });

        $scope.$on('event:auth-login-failed', function (e, status) {
          var error = "Login failed.";
          if (status == 401) {
            error = "Invalid Username or Password.";
          }
          $scope.message = error;
        });

        $scope.$on('event:auth-logout-complete', function () {
          console.log("logout complete");
          $state.go('login', {});
          //$state.go('app.home', {}, {reload: true, inherit: false});
        });
      }
    ];
  });
