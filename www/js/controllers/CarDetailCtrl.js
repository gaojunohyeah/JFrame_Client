/**
 * Created by gaojun on 16/01/19.
 */

define(
  [
    'config',
  ],
  function (config) {
    'use strict';

    return ['$scope', 'searchItemSrv', 'enums', 'dataSrv', '$stateParams'
      , 'reqSrv', '$ionicSlideBoxDelegate',
      function ($scope, searchItemSrv, enums, dataSrv, $stateParams
        , reqSrv, $ionicSlideBoxDelegate) {
        var carId = $stateParams.id;

        $scope.carInfo = {};

        var getCarDetail = function () {
          // 查询出售车辆详细信息
          reqSrv.queryCarInfo({carId: carId}).then(function (result) {
            if (200 === result.status
              && enums.ret.SUCCESS === result.data.ret) {
              $scope.carInfo = {
                id: result.data.id,

                sellId: result.data.sellId,
                sellDesc: result.data.sellDesc,
                sellTelephone: result.data.sellTelephone,
                sellNickname: result.data.sellNickname,
                sellImg: result.data.sellImg,

                appraiserId: result.data.appraiserId,
                appraiserDesc: result.data.appraiserDesc,
                apprTitle: result.data.apprTitle,
                apprTelephone: result.data.apprTelephone,
                apprNickname: result.data.apprNickname,
                apprImg: result.data.apprImg,

                brandId: result.data.brandId,
                price: result.data.price,
                distance: result.data.distance,
                city: result.data.city,
                startTime: result.data.startTime,
                color: result.data.color,
                tag: result.data.tag,

                seriesId: result.data.seriesId,
                modelId: result.data.modelId,
                modelName: result.data.modelName,
                carType: result.data.carType,
                transmission: result.data.transmission,
              };

              // 城市
              var city = dataSrv.getCitys()['' + result.data.city];
              $scope.carInfo.cityName = city == undefined ? '' : city.name;

              // 系列
              var series = dataSrv.getCarSeries()['' + result.data.seriesId];
              $scope.carInfo.seriesName = series == undefined ? '' : series.name;

              // 品牌
              var brand = dataSrv.getBrands()['' + result.data.brandId];
              $scope.carInfo.brandName = brand == undefined ? '' : brand.name;

              // 推荐标签
              $scope.carInfo.tag = result.data.tag.split(',');
              $scope.carInfo.tag.splice(0, 1);
              $scope.carInfo.tag.splice($scope.carInfo.tag.length - 1, 1);

              // 展示图片
              $scope.carInfo.imgList = [];
              _.forEach(result.data.imgList, function (carImg) {
                var data = {
                  id: carImg.id,
                  imgUrl: config.resource_url + carImg.imgUrl,
                  imgType: carImg.imgType,
                };

                $scope.carInfo.imgList.push(data);
              });
              $scope.carInfo.imgSize = $scope.carInfo.imgList.length;

              // 重载展示图片幻灯片
              var slideDelegate = $ionicSlideBoxDelegate.$getByHandle('carDetailSlideImgs');
              slideDelegate.update();
              slideDelegate.loop(true);
              $scope.nowSlideIndex = 1;
              //$ionicSlideBoxDelegate.loop(true);
            }
          });
        };

        /**
         * 幻灯片滑动监听事件
         *
         * @param index 当前页
         */
        $scope.carDetailSlide = function (index) {
          if (index >= $scope.carInfo.imgSize) {
            index -= $scope.carInfo.imgSize;
          }
          $scope.nowSlideIndex = index + 1;
        };

        // 打开页面的时候去查询车辆详情
        getCarDetail();
      }
    ];
  }
);
