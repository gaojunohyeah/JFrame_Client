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
    './I18nSrv',
  ],
  function (angular, _, config
    , reqSrv, i18nSrv) {
    'use strict';

    var module = angular.module(config.name + '.factories', []);

    module.factory('reqSrv', reqSrv);
    module.factory('i18nSrv', i18nSrv);
  }
);
