/**
 * Created by gaojun on 15/11/26.
 */

define(
  [
    'config',
  ],
  function (config) {
    'use strict';

    return ['$scope', 'searchItemSrv', 'enums', 'dataSrv', '$state',
      function ($scope, searchItemSrv, enums, dataSrv, $state) {

        //$scope.carItems = [
        //  {tags: [1, 2, 3],},
        //  {tags: [1, 2, 3],},
        //  {tags: [1, 3],},
        //  {tags: [1, 2],},
        //  {tags: [1, 2],},
        //  {tags: [2, 3],},
        //  {tags: [1, 3],},
        //  {tags: [1, 2, 3],},
        //  {tags: [1, 3],},
        //  {tags: [1, 2, 3],},
        //  {tags: [1, 2, 3],},
        //  {tags: [1, 2, 3],},
        //  {tags: [2],},
        //  {tags: [1, 2, 3],},
        //  {tags: [1, 2, 3],},
        //  {tags: [1, 2, 3],},
        //  {tags: [2, 3],},
        //  {tags: [1, 2, 3],},
        //  {tags: [1, 2, 3],},
        //  {tags: [1, 2, 3],},
        //  {tags: [1, 2, 3],},
        //  {tags: [1, 2],},
        //];

        /**
         * 监听买车页面刷新事件
         */
        $scope.$on('event:refresh-car-page', function () {
          // 监听事件的刷新，都需要重载
          searchItemSrv.setReload(true);

          $scope.search();
        });

        /**
         * 显示车详情页面
         * @param carItem 车对象
         */
        $scope.showCarDetail = function (carItem) {
          $state.go('carDetail', {id: carItem.id});
        };

        /**
         * 进行查询操作
         */
        $scope.search = function () {
          // 获取当前查询条件
          //var curSitem = searchItemSrv.curSitem;

          //alert("haha");
          // 查询当前能搜到的数据条数
          searchItemSrv.query().then(function (result) {
            if (200 === result.status
              && enums.ret.SUCCESS === result.data.ret) {
              searchItemSrv.setPageNo(result.data.pageNo);
              searchItemSrv.setPageSize(result.data.pageSize);
              searchItemSrv.setTotalNum(result.data.totalNum);

              // 处理结果数据
              if (result.data.carList.length >= 0) {
                // 需要重载
                if (searchItemSrv.getReload()) {
                  $scope.carItems = [];
                  searchItemSrv.setReload(false);
                }

                _.forEach(result.data.carList, function (carData) {
                  var car = {
                    id: carData.id,
                    price: carData.price,
                    distance: carData.distance,
                    showImg: config.resource_url + carData.showImg,
                  };

                  // 获取词典解析
                  var series = dataSrv.getCarSeries()['' + carData.seriesId];
                  car.seriesName = series == undefined ? '' : series.name;

                  car.modelName = carData.modelName;

                  var brand = dataSrv.getBrands()['' + carData.brandId];
                  car.brandName = brand == undefined ? '' : brand.name;

                  car.startTime = carData.startTime;

                  car.tag = carData.tag.split(',');
                  car.tag.splice(0, 1);
                  car.tag.splice(car.tag.length - 1, 1);

                  $scope.carItems.push(car);
                });
              }
            }
          })
        };

        // 首次加载买车controller时需要主动查询一次
        $scope.search();
      }
    ];
  }
);
