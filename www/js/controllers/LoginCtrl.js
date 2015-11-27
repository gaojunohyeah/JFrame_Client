/**
 * Created by gaojun on 15/11/26.
 */

define([],
  function () {
    'use strict';

    return ['$scope', 'reqSrv', function ($scope, reqSrv) {
      /**
       * 用户信息
       * @type {{username: string, password: string, lslogin: boolean}}
       */
      $scope.user = {
        username: "",
        password: "",
        lslogin: false,
      };

      /**
       * 登陆函数
       */
      $scope.login = function () {
        reqSrv.login($scope.user.username, $scope.user.password);
      };
    }];
  });
