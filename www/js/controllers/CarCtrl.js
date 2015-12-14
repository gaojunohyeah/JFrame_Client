/**
 * Created by gaojun on 15/11/26.
 */

define([],
  function () {
    'use strict';

    return ['$scope', 'searchItemSrv',
      function ($scope, searchItemSrv) {

        $scope.carItems = [
          {tags: [1, 2, 3],},
          {tags: [1, 2, 3],},
          {tags: [1, 3],},
          {tags: [1, 2],},
          {tags: [1, 2],},
          {tags: [2, 3],},
          {tags: [1, 3],},
          {tags: [1, 2, 3],},
          {tags: [1, 3],},
          {tags: [1, 2, 3],},
          {tags: [1, 2, 3],},
          {tags: [1, 2, 3],},
          {tags: [2],},
          {tags: [1, 2, 3],},
          {tags: [1, 2, 3],},
          {tags: [1, 2, 3],},
          {tags: [2, 3],},
          {tags: [1, 2, 3],},
          {tags: [1, 2, 3],},
          {tags: [1, 2, 3],},
          {tags: [1, 2, 3],},
          {tags: [1, 2],},
        ];

        /**
         * 监听买车页面刷新事件
         */
        $scope.$on('event:refresh-car-page', function () {
          $scope.search();
        });

        /**
         * 显示车详情页面
         * @param carItem 车对象
         */
        $scope.showCarDetail = function (carItem) {
          alert("heihei");
        };

        /**
         * 进行查询操作
         */
        $scope.search = function () {
          // 获取当前查询条件
          //var curSitem = searchItemSrv.curSitem;

          alert("haha");
        };

        // 首次加载买车controller时需要主动查询一次
        $scope.search();
      }
    ];
  }
);
