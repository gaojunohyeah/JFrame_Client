/**
 * Created by gaojun on 15/12/8.
 */

define(
  [
    'lodash',
  ],
  function (_) {
    'use strict';

    return ['$rootScope', '$scope', 'reqSrv', '$window', '$filter', 'dataSrv'
      , 'searchItemSrv', 'enums',
      function ($rootScope, $scope, reqSrv, $window, $filter, dataSrv
        , searchItemSrv, enums) {
        $scope.spageHeight = {
          // (顶部搜索栏44，查询条件分类条29，底部导航49，底部查看条49, 修正像素1)
          height: ($window.innerHeight - 44 - 29 - 49 - 49 + 1) + 'px',
        };

        // 城市信息
        $scope.areas = {};
        $scope.cityBtns = {};
        $scope.queryNum = 0;

        // 价格信息
        $scope.prices = [];
        $scope.nowPrice = {
          lowPrice: 0,
          hightPrice: 0
        };
        $scope.priceErrMsg = '';

        // 品牌信息
        $scope.brandid = 0;
        $scope.showBrandid = 0;
        $scope.carSeriesId = 0;
        $scope.brandInfos = [];

        // 其他信息
        $scope.tags = [];
        $scope.chooseTags = [];
        $scope.carTypes = [];
        $scope.chooseCartypes = [];
        $scope.colors = [];
        $scope.chooseColors = [];

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

        /**
         * 构建查询页的城市对象列表
         *
         * @param cityList 城市列表
         * @param choosedCityIds 之前已经选取的城市
         * @return {{}}
         */
        var buildCitys = function (cityList, choosedCityIds) {
          var areas = {};

          // 处理城市数据
          _.forEach(cityList, function (city, id) {
            var area = city.area;

            if (_.isUndefined(areas[area]) || _.isNull(areas[area])) {
              areas[area] = [];
            }

            var cityData = {
              id: id,
              name: city.name,
              choose: false,
            };

            // 城市已经被选中
            if (_.indexOf(choosedCityIds, parseInt(id)) > -1) {
              cityData.choose = true;
              $scope.chooseCity(id);
            }

            areas[area].push(cityData);
          });
          $scope.areas = areas;

          // 数据整合
          _.forEach($scope.areas, function (citys, areakey) {
            $scope.areas[areakey] = $filter('li4')(citys, 4)
          });
        };

        /**
         * 构建查询页的价格对象列表
         *
         * @param priceItems 价格列表数据
         * @param choosePrice 当前选中的价格
         */
        var buildPrices = function (priceItems, choosePrice) {
          var prices = [];

          _.forEach(priceItems, function (pitem) {
            var data = pitem;

            // 当前价格区间为默认的区间之一
            data.choose = parseInt(pitem['query'][0]['value']) == choosePrice[0]
              && parseInt(pitem['query'][1]['value']) == choosePrice[1];

            prices.push(data);
          });

          $scope.nowPrice.lowPrice = choosePrice[0];
          $scope.nowPrice.highPrice = choosePrice[1];

          // 数据整合
          $scope.prices = $filter('li4')(prices, 3)
        };

        /**
         * 构建查询页的推荐标签列表
         *
         * @param tags 所有的推荐标签
         * @param cTags 已经选择的推荐标签
         */
        var buildTags = function (tags, cTags) {
          // 循环所有推荐标签
          _.forEach(tags, function (tag) {
            var data = {
              id: tag.id,
              name: tag.name,
            };

            // 判断是否选中
            if (_.indexOf(cTags, tag.id) > -1) {
              data.choose = true;
            }

            $scope.tags.push(data);
          });

          $scope.tags = $filter('li4')($scope.tags, 4);
        };

        /**
         * 构建查询页的车类型列表
         *
         * @param carTypes 所有的车类型
         * @param cCarTypes 已经选择的车类型
         */
        var buildCarTypes = function (carTypes, cCarTypes) {
          // 循环所有车辆类型
          _.forEach(carTypes, function (carType) {
            var data = {
              id: carType.id,
              name: carType.name,
            };

            // 判断是否选中
            if (_.indexOf(cCarTypes, carType.id) > -1) {
              data.choose = true;
            }

            $scope.carTypes.push(data);
          });

          $scope.carTypes = $filter('li4')($scope.carTypes, 4);
        };

        /**
         * 构建查询页的颜色类型列表
         *
         * @param colors 所有的颜色类型
         * @param cColors 选择的颜色类型
         */
        var buildColors = function (colors, cColors) {
          // 循环所有颜色类型
          _.forEach(colors, function (color) {
            var data = {
              id: color.id,
              name: color.name,
            };

            // 判断是否选中
            if (_.indexOf(cColors, color.id) > -1) {
              data.choose = true;
            }

            $scope.colors.push(data);
          });

          $scope.colors = $filter('li4')($scope.colors, 4);
        };

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

            // 页面参数重置
            switch (index) {
              case 1:
                // 重置城市
                $scope.areas = {};
                $scope.cityBtns = {};

                var chooseCitys = searchItemSrv.getCitys();
                buildCitys(dataSrv.getCitys(), chooseCitys);

                // 进来时就进行一次初始查询
                $scope.chooseCity();
                break;

              case 2:
                // 重置品牌信息
                $scope.brandid = 0;
                $scope.showBrandid = 0;
                $scope.carSeriesId = 0;

                // 构建车辆品牌查询条件集
                $scope.brandInfos = searchItemSrv.buildSearchBrands(dataSrv.getBrands(), dataSrv.getCarSeries());

                break;

              case 3:
                // 重置价格选择
                $scope.prices = [];
                $scope.nowPrice = {
                  lowPrice: 0,
                  highPrice: 0,
                };
                $scope.priceErrMsg = '';

                var choosePrices = searchItemSrv.getPrices();
                buildPrices(searchItemSrv.pricePreItems(), choosePrices);
                break;

              case 4:
                // 重置其他条件
                $scope.tags = [];
                $scope.chooseTags = [];
                $scope.carTypes = [];
                $scope.chooseCartypes = [];
                $scope.colors = [];
                $scope.chooseColors = [];

                // 构建 条件数据
                $scope.chooseTags = searchItemSrv.getTags();
                buildTags(dataSrv.getTags(), $scope.chooseTags);

                $scope.chooseCarTypes = searchItemSrv.getCarTypes();
                buildCarTypes(dataSrv.getCarTypes(), $scope.chooseCarTypes);

                $scope.chooseColors = searchItemSrv.getColors();
                buildColors(dataSrv.getCarColors(), $scope.chooseColors);

                // 打开页面先 查询一遍
                $scope.chooseOthers();
                break;

              default:
                break;
            }
          }


          // TODO 动画
        };

        /**
         * 选择某个城市
         *
         * @param cityId 城市id
         */
        $scope.chooseCity = function (cityId) {
          if (cityId) {
            $scope.cityBtns['id' + cityId] = !$scope.cityBtns['id' + cityId];
          }

          var chooseCitys = [];
          _.forEach($scope.cityBtns, function (value, key) {
            if (value) {
              var cityId = parseInt(key.substring(2));
              chooseCitys.push(cityId);
            }
          });
          searchItemSrv.refreshCitys(chooseCitys);

          // 查询当前能搜到的数据条数
          searchItemSrv.queryNum().then(function (result) {
            if (200 === result.status
              && enums.ret.SUCCESS === result.data.ret) {
              $scope.queryNum = result.data.queryNum;
            }
          })
        };

        /**
         * 确认选择的按钮id
         */
        $scope.cityConfirm = function () {
          $scope.showSearchItem(1);

          // 广播买车页面刷新事件
          $rootScope.$broadcast('event:refresh-car-page');
        };

        /**
         * 选择某个价格区间
         *
         * @param pitem
         */
        $scope.choosePrice = function (pitem) {
          if (!_.isUndefined(pitem) && !_.isEmpty(pitem)) {
            $scope.nowPrice.lowPrice = parseInt(pitem['query'][0]['value']);
            $scope.nowPrice.highPrice = parseInt(pitem['query'][1]['value']);
          }

          $scope.priceConfirm();
        };

        /**
         * 确认价格区间
         */
        $scope.priceConfirm = function () {
          var lowPrice = parseInt($scope.nowPrice.lowPrice);
          var highPrice = parseInt($scope.nowPrice.highPrice);

          // 获取最大价格区间的下限
          var priceItems = searchItemSrv.pricePreItems();
          var maxLowPitem = priceItems[priceItems.length - 1];
          var maxLowPrice = parseInt(maxLowPitem['query'][0]['value']);

          // 上限价格不为0或者下限价格达到最大
          if (highPrice > 0 || lowPrice == maxLowPrice
            || (highPrice == 0 && lowPrice == 0)) {
            // 更新价格
            searchItemSrv.refreshPrices([lowPrice, highPrice]);

            $scope.showSearchItem(3);

            // 广播买车页面刷新事件
            $rootScope.$broadcast('event:refresh-car-page');
          }
          // 价格不正确
          else {
            $scope.priceErrMsg = '请输入正确的价格区间';
          }
        };

        /**
         * 选中品牌
         *
         * @param brandInfo
         */
        $scope.chooseBrand = function (brandInfo) {
          $scope.brandid = brandInfo.brandId;
          // 是否显示品牌系列
          if ($scope.showBrandid == brandInfo.brandId) {
            $scope.showBrandid = 0;
          } else {
            $scope.showBrandid = brandInfo.brandId;
          }
        };

        $scope.chooseSeries = function (seriesId) {
          $scope.carSeriesId = seriesId;
          // 更新品牌
          searchItemSrv.refreshBrands($scope.brandid, $scope.carSeriesId);

          $scope.showSearchItem(2);

          // 广播买车页面刷新事件
          $rootScope.$broadcast('event:refresh-car-page');
        };

        /**
         * 其他条件页面，选择相应查询条件更新查询数量
         *
         * @param data 选中的查询条件
         * @param type 条件类型
         */
        $scope.chooseOthers = function (data, type) {
          if (!_.isUndefined(data) && !_.isNull(data)) {
            data.choose = !data.choose;

            var index = -1;
            switch (type) {
              // 推荐标签
              case 'tag':
                index = _.indexOf($scope.chooseTags, data.id);
                if (index > -1) {
                  $scope.chooseTags.splice(index, 1);
                } else {
                  $scope.chooseTags.push(data.id);
                }
                searchItemSrv.refreshTags($scope.chooseTags);
                break;

              // 车辆类型
              case 'cartype':
                index = _.indexOf($scope.chooseCartypes, data.id);
                if (index > -1) {
                  $scope.chooseCartypes.splice(index, 1);
                } else {
                  $scope.chooseCartypes.push(data.id);
                }
                searchItemSrv.refreshCarTypes($scope.chooseCartypes);
                break;

              // 车辆颜色
              case 'color':
                index = _.indexOf($scope.chooseColors, data.id);
                if (index > -1) {
                  $scope.chooseColors.splice(index, 1);
                } else {
                  $scope.chooseColors.push(data.id);
                }
                searchItemSrv.refreshColors($scope.chooseColors);
                break;

              default:
                break;
            }
          }

          // 查询当前能搜到的数据条数
          searchItemSrv.queryNum().then(function (result) {
            if (200 === result.status
              && enums.ret.SUCCESS === result.data.ret) {
              $scope.queryNum = result.data.queryNum;
            }
          })
        };

        /**
         * 确认选择的按钮id
         */
        $scope.othersConfirm = function () {
          $scope.showSearchItem(4);

          // 广播买车页面刷新事件
          $rootScope.$broadcast('event:refresh-car-page');
        };
      }
    ];
  }
);
