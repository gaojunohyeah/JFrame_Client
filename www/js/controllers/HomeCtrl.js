/**
 * Created by gaojun on 15/11/26.
 */

define(
  [
    'lodash',
  ],
  function (_) {
    'use strict';

    return ['$scope', 'reqSrv', '$ionicSlideBoxDelegate', 'searchItemSrv', '$state', '$rootScope',
      function ($scope, reqSrv, $ionicSlideBoxDelegate, searchItemSrv, $state, $rootScope) {
        $scope.home = {
          stext: "",
        };

        // 首页快速查询数据
        $scope.hsItems = searchItemSrv.hsItems();

        $scope.slides = [
          {
            'img': 'http://img1.imgtn.bdimg.com/it/u=2583925440,603289105&fm=21&gp=0.jpg',
            'url': 'haha1'
          },
          {
            'img': 'http://img4.imgtn.bdimg.com/it/u=1128633536,823776518&fm=21&gp=0.jpg',
            'url': 'haha2'
          },
          {
            'img': 'http://p9.qhimg.com/t01d054bd548c9e9101.jpg',
            'url': 'haha3'
          }
        ];

        /**
         * 首页幻灯片点击函数
         * 通过 $ionicSlideBoxDelegate 对象获取当前index进行处理
         */
        $scope.homeSlideClick = function (url) {
          var index = $ionicSlideBoxDelegate.currentIndex();
          alert("你点中了第 " + (index + 1) + " 个幻灯片~~~");
          alert("url is : " + url);
          //alert($ionicSlideBoxDelegate.slidesCount());
        };

        /**
         * 搜索框查询函数
         * key: 搜索key，字段名称
         * value: 搜索值
         */
        $scope.homeSearch = function (key, value) {
          var stext = value || $scope.home.stext;
          if (_.isUndefined(key) || _.isNull(key)) {
            key = 'brand';
          }

          // 没有搜索参数
          if (_.isUndefined(key) || _.isNull(key) || stext.toString().length <= 0) {
            return;
          }

          alert(stext);
        };

        /**
         * 快速查询
         * @param sitem 快速查询条件集
         */
        $scope.fastSearch = function (sitem) {
          // 清空当前查询条件集，添加快速查询的条件集
          searchItemSrv.clearCurSitem();
          searchItemSrv.addCurSitem(sitem);

          // 页面跳转并 广播买车页面刷新事件
          $state.go('main.car', {});
          $rootScope.$broadcast('event:refresh-car-page');
        };
      }];
  });
