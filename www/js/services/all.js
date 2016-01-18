/**
 * Created by gaojun on 15/11/26.
 */

define(
  [
    // Standard Libs
    'angular',
    'lodash',
    'config',

    './Enum',
    './BaseSitemSrv',
    './SearchItemSrv',
  ],
  function (angular, _, config
    , enums, baseSitemSrv, searchItemSrv) {
    'use strict';

    var module = angular.module(config.name + ".services", []);

    module.service('enums', enums);
    module.service('baseSitemSrv', baseSitemSrv);
    module.service('searchItemSrv', searchItemSrv);
  }
);
