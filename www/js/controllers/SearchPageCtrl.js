/**
 * Created by gaojun on 15/12/8.
 */

define(
  [],
  function () {
    'use strict';

    return ['$scope', 'reqSrv', '$window',
      function ($scope, reqSrv, $window) {
        $scope.spageHeight = {
          height: ($window.innerHeight - 72) + 'px',
        };

        $scope.page = {
          index: 0,
          show: false,
          s1: false,
          s2: false,
          s3: false,
          s4: false,
          url: '',
          s1url: 'templates/base/search/search1Page.html',
          s2url: 'templates/base/search/search2Page.html',
          s3url: 'templates/base/search/search3Page.html',
          s4url: 'templates/base/search/search4Page.html',
        };

        $scope.areas = [
          {
            name: 'dongbei',
            citys: [
              'shenyang',
              'changchun',
            ]
          },
          {
            name: 'huabei',
            citys: [
              'beijing',
              'tianjing',
              'shijiazhuang',
              'zhengzhou',
              'qingdao',
              'dalian',
            ]
          },
          {
            name: 'xinan',
            citys: [
              'chengdu',
              'panzhihua',
            ]
          },
        ];

        /**
         * 显示查询条件
         * @param index
         */
        $scope.showSearchItem = function (index) {
          //alert($window.innerHeight);
          // 先移除原有page
          $scope.page["s" + $scope.page.index] = !$scope.page["s" + $scope.page.index];

          // 如果和之前的index相同，则为关闭查询页
          if (index === $scope.page.index) {
            $scope.page.show = false;
            $scope.page.url = '';
            $scope.page.index = 0;
          } else {
            $scope.page.show = true;
            $scope.page.url = $scope.page['s' + index + 'url'];
            $scope.page.index = index;
            $scope.page["s" + index] = !$scope.page["s" + index];
          }

          // TODO 动画
        };

      }];
  });
