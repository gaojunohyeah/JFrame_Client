/**
 * Created by gaojun on 15/12/18.
 */

define(
  [
    'lodash',
  ],
  function (_) {
    'use strict';

    return ['$rootScope', 'localStorageService', 'reqSrv', 'enums',
      function ($rootScope, localStorageService, reqSrv, enums) {
        var brands, citys, carTypes, carColors, tags, carSeries;

        var getBrands = function () {
          return brands;
        };

        var getCitys = function () {
          return citys;
        };

        var getCarTypes = function () {
          return carTypes;
        };

        var getCarColors = function () {
          return carColors;
        };

        var getTags = function () {
          return tags;
        };

        var getCarSeries = function () {
          return carSeries;
        };

        var buildBrands = function (brandList) {
          var list = {};

          // 处理品牌
          _.forEach(brandList, function (brand) {
            list["" + brand.id] = {
              id: brand.id,
              name: brand.name,
              letter: brand.letter,
            }
          });

          return list;
        };

        var buildCarTypes = function (carTypeList) {
          var list = {};

          _.forEach(carTypeList, function (carType) {
            list["" + carType.id] = {
              id: carType.id,
              name: carType.name
            }
          });

          return list;
        };

        var buildCarColors = function (carColorList) {
          var list = {};

          _.forEach(carColorList, function (carColor) {
            list["" + carColor.id] = {
              id: carColor.id,
              name: carColor.name
            }
          });

          return list;
        };

        var buildCitys = function (cityList) {
          var list = {};

          // 处理城市数据
          _.forEach(cityList, function (city) {
            list["" + city.id] = {
              id: city.id,
              area: 'AREA_NAME_' + city.area,
              name: city.name
            };
          });

          return list;
        };

        var buildTags = function (tagsList) {
          var list = {};

          _.forEach(tagsList, function (tagsList) {
            list["" + tagsList.id] = {
              id: tagsList.id,
              name: tagsList.name
            }
          });

          return list;
        };

        var buildCarSeries = function (carSeriesList) {
          var list = {};

          _.forEach(carSeriesList, function (carSeries) {
            list["" + carSeries.id] = {
              id: carSeries.id,
              brandId: carSeries.brandId,
              name: carSeries.name
            }
          });

          return list;
        };

        /**
         * 加载初始数据
         */
        var init = function () {
          var promise = reqSrv.loadInitData();

          promise.then(function (result) {
            if (200 === result.status
              && enums.ret.SUCCESS === result.data.ret) {

              brands = buildBrands(result.data.brandlist);
              carTypes = buildCarTypes(result.data.carTypeList);
              citys = buildCitys(result.data.cityList);
              carColors = buildCarColors(result.data.carColorList);
              tags = buildTags(result.data.tagsList);
              carSeries = buildCarSeries(result.data.carSeriesList);

              // 缓存到本地
              localStorageService.set('init_brands', brands);
              localStorageService.set('init_carTypes', carTypes);
              localStorageService.set('init_citys', citys);
              localStorageService.set('init_carColors', carColors);
              localStorageService.set('init_tags', tags);
              localStorageService.set('init_carSeries', carSeries);
            } else {
              // 从本地缓存获取
              loadInitDataLocal();
            }
          }, function (error) {
            // 从本地缓存获取
            loadInitDataLocal();
          });
        };

        /**
         * 从本地历史缓存获取初始化数据(从服务端获取失败之后)
         */
        var loadInitDataLocal = function () {
          brands = localStorageService.get('init_brands') || {};
          carTypes = localStorageService.get('init_carTypes') || {};
          citys = localStorageService.get('init_citys') || {};
          carColors = localStorageService.get('init_carColors') || {};
          tags = localStorageService.get('init_tags') || {};
          carSeries = localStorageService.get('init_carSeries') || {};
        };

        return {
          init: init,
          getBrands: getBrands,
          getCitys: getCitys,
          getCarTypes: getCarTypes,
          getCarColors: getCarColors,
          getTags: getTags,
          getCarSeries: getCarSeries,
        }
      }
    ]
  }
);
