/**
 * Created by gaojun on 15/12/18.
 */

define(
  [],
  function () {
    'use strict';

    return ['$rootScope', 'localStorageService', 'reqSrv',
      function ($rootScope, localStorageService, reqSrv) {

        /**
         * 加载初始数据
         */
        var init = function () {
          //var promise = reqSrv.loadInitData();
        };

        return {
          init: init,
        }
      }
    ]
  }
);
