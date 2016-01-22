/**
 * Created by gaojun on 15/12/2.
 */

define(
  [
    'config',
  ],
  function (config) {
    'use strict';

    return ['$filter', 'reqSrv', 'baseSitemSrv', 'enums',
      function ($filter, reqSrv, baseSitemSrv, enums) {
        // 分页信息
        var pageNo = 1;
        var pageSize = config.default_page_size;
        var order = null;
        var orderType = enums.base.ASC;
        var reload = true;

        // 总数据量
        var totalNum = 0;

        // 查询条件城市id集
        var citys = [];
        // 查询条件价格区间
        var price = [0, 0];
        // 查询条件品牌信息
        var brandId = 0;
        var carSeriesId = 0;

        // 其他查询条件信息
        var tags = [];
        var carTypes = [];
        var colors = [];

        var curSitem = {};

        this.getCitys = function () {
          return citys;
        };

        this.getPrices = function () {
          return price;
        };

        this.getBrands = function () {
          return [brandId, carSeriesId];
        };

        this.getTags = function () {
          return tags;
        };

        this.getCarTypes = function () {
          return carTypes;
        };

        this.getColors = function () {
          return colors;
        };

        this.getPageNo = function () {
          return pageNo;
        };

        this.setPageNo = function (pno) {
          pageNo = pno;
        };

        this.getPageSize = function () {
          return pageSize;
        };

        this.setPageSize = function (psize) {
          pageSize = psize;
        };

        this.getOrder = function () {
          return [order, orderType];
        };

        this.setOrder = function (ord, ordType) {
          if (!_.isUndefined(ord) && !_.isNull(ord)) {
            order = ord;
            orderType = ordType;
          }
        };

        this.getReload = function () {
          return reload;
        };

        this.setReload = function (re) {
          reload = re;
        };

        this.getTotalNum = function () {
          return totalNum;
        };

        this.setTotalNum = function (num) {
          totalNum = num;
        };

        // 首页快速搜索
        var hsItems = null;

        // 价格区间默认搜索项
        var pricePreItems = null;

        this.hsItems = function () {
          if (_.isNull(hsItems)) {
            hsItems = baseSitemSrv.hsItems;
          }

          return hsItems;
        };

        this.pricePreItems = function () {
          if (_.isNull(pricePreItems)) {
            pricePreItems = baseSitemSrv.pricePreItems;
          }

          return pricePreItems;
        };

        this.getCurSitem = function () {
          return curSitem;
        };

        /**
         * 向当前查询条件集中添加一项
         * @param sitem
         */
        this.addCurSitem = function (sitem) {

        };

        /**
         * 从当前查询条件集中移除一项
         * @param sitem
         */
        this.removeCurSitem = function (sitem) {

        };

        /**
         * 清空当前查询条件集
         */
        this.clearCurSitem = function () {
          curSitem = {};
        };

        /**
         * 更新查询城市信息
         *
         * @param cityIds 城市ID数组
         */
        this.refreshCitys = function (cityIds) {
          citys = cityIds;
        };

        /**
         * 更新查询价格信息
         *
         * @param prices 价格信息
         */
        this.refreshPrices = function (prices) {
          price = prices;
        };

        /**
         * 更新查询推荐标签信息
         *
         * @param ctags 推荐标签信息
         */
        this.refreshTags = function (ctags) {
          tags = ctags;
        };

        /**
         * 更新查询车辆类型信息
         *
         * @param cCarTypes 车辆类型信息
         */
        this.refreshCarTypes = function (cCarTypes) {
          carTypes = cCarTypes;
        };

        /**
         * 更新查询车辆颜色信息
         *
         * @param cColors 车辆颜色信息
         */
        this.refreshColors = function (cColors) {
          colors = cColors;
        };

        /**
         * 更新查询品牌信息
         *
         * @param bid 品牌id
         * @param sid 品牌系列id
         */
        this.refreshBrands = function (bid, sid) {
          brandId = bid;
          carSeriesId = sid;
        };

        // 查询页品牌查询条件集
        // (数量太大，减少build次数，所以放到service中)
        var searchBrands = null;
        this.buildSearchBrands = function (brands, carSeries) {
          if (_.isNull(searchBrands) || _.isEmpty(searchBrands)) {
            var sbrands = {};

            // 遍历所有品牌
            _.forEach(brands, function (brand) {
              sbrands['' + brand.id] = {
                brandId: brand.id,
                brandName: brand.name,
                letter: brand.letter,
                series: []
              };
            });

            // 遍历所有品牌系列
            _.forEach(carSeries, function (series) {
              var brandInfo = sbrands['' + series.brandId];

              brandInfo.series.push(series);
            });

            var seriesSortFunc = function (s1, s2) {
              if (s1.name < s2.name) {
                return -1;
              } else {
                return 1;
              }
            };

            // 进行数据整合
            searchBrands = [];
            _.forEach(sbrands, function (brandInfo) {
              // 系列排序
              brandInfo.series.sort(seriesSortFunc);
              // 系列拆分
              brandInfo.series = $filter('li4')(brandInfo.series, 2);

              if (!searchBrands[brandInfo.letter]) {
                searchBrands[brandInfo.letter] = [];
              }

              searchBrands[brandInfo.letter].push(brandInfo);
            });

            // 对数据再进行 拆分和排序
            _.forEach(searchBrands, function (brands, key) {
              if (!_.isUndefined(brands)) {
                brands.sort(seriesSortFunc);
                //// 品牌拆分
                //searchBrands[key] = $filter('li4')(brands, 2);
              }
            })
          }

          return searchBrands;
        };

        /**
         * 构建查询条件集
         */
        var buildQueryParams = function () {
          var params = [];

          // 城市
          if (citys.length > 0) {
            var cityParam = {
              key: enums.car.key.city,
              oper: enums.base.operator.in,
              value: citys
            };

            params.push(cityParam);
          }

          // 价格区间
          if (price[0] > 0) {
            var lowerPrice = {
              key: enums.car.key.price,
              oper: enums.base.operator.gte,
              value: parseFloat(price[0])
            };

            params.push(lowerPrice);
          }
          if (price[1] > 0) {
            var highPrice = {
              key: enums.car.key.price,
              oper: enums.base.operator.lte,
              value: parseFloat(price[1])
            };

            params.push(highPrice);
          }

          // 品牌
          if (brandId > 0) {
            var brand = {
              key: enums.car.key.brandId,
              oper: enums.base.operator.e,
              value: parseInt(brandId)
            };

            params.push(brand);
          }
          // 品牌系列
          if (carSeriesId > 0) {
            var carSeries = {
              key: enums.car.key.seriesId,
              oper: enums.base.operator.e,
              value: parseInt(carSeriesId)
            };

            params.push(carSeries);
          }

          // 推荐标签
          if (!_.isEmpty(tags)) {
            var tagParam = {
              key: enums.car.key.tag,
              oper: enums.base.operator.likeany,
              value: tags
            };

            params.push(tagParam);
          }

          // 车辆类型
          if (!_.isEmpty(carTypes)) {
            var carTypeParam = {
              key: enums.car.key.ctype,
              oper: enums.base.operator.in,
              value: carTypes
            };

            params.push(carTypeParam);
          }

          // 车辆颜色
          if (!_.isEmpty(colors)) {
            var carColorParam = {
              key: enums.car.key.color,
              oper: enums.base.operator.in,
              value: colors
            };

            params.push(carColorParam);
          }

          // TODO 其他条件

          return params;
        };

        /**
         * 获取查询数据结果集数量
         * @return {number}
         */
        this.queryNum = function () {
          var queryParams = buildQueryParams();

          // 请求查询数量
          return reqSrv.queryCarNum({queryList: queryParams});
        };

        /**
         * 获取查询结果
         */
        this.query = function () {
          var queryParams = buildQueryParams();

          // 参数
          var param = {
            queryList: queryParams,
            pageNo: pageNo,
            pageSize: pageSize,
          };

          // 需要排序
          if (!_.isUndefined(order) && !_.isNull(order)) {
            param.order = order;
            param.orderType = orderType;
          }

          // 请求查询车辆
          return reqSrv.queryCarList(param);
        }
      }
    ];
  }
);
