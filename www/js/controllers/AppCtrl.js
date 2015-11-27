/**
 * Created by gaojun on 15/11/26.
 */

define([
    'config'
  ],
  function (config) {
    'use strict';

    return ['$scope', '$rootScope', function ($scope, $rootScope) {
      $rootScope.config = config;

    }];
  });
