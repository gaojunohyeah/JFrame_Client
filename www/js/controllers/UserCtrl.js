/**
 * Created by gaojun on 15/11/26.
 */

define([],
  function () {
    'use strict';

    return ['$scope', '$state', 'authSrv',
      function ($scope, $state, authSrv) {

        $scope.logout = function () {
          authSrv.logout();
        };
      }
    ];
  });
