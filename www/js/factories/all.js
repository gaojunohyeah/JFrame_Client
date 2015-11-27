/**
 * Created by gaojun on 15/11/26.
 */

define(
  [
    // Standard Libs
    'angular',
    'lodash',
    'config',

    './ReqSrv',
  ],
  function (angular, _, config
    , reqSrv) {
    'use strict';

    var module = angular.module(config.name + '.factories', []);

    module.factory('reqSrv', reqSrv);
  }
);
