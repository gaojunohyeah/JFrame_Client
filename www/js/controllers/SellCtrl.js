/**
 * Created by gaojun on 15/11/26.
 */

define(
  [],
  function () {
    'use strict';

    return ['$scope', 'reqSrv', 'baseSitemSrv',
      function ($scope, reqSrv, baseSitemSrv) {
        $scope.questions = baseSitemSrv.sellQuestions;
      }];
  });
