/**
 * Created by gaojun on 15/12/2.
 */

define(
  [],
  function () {
    'use strict';

    return ['$filter', 'enumSrv',
      function ($filter, enumSrv) {
        var curSitem = {};

        // 首页快速搜索
        var hsItems = [
          [
            {
              name: $filter('i18n')("CAR.CARTYPE.CAR"),
              key: enumSrv.car.key.ctype,
              query: [
                {
                  value: enumSrv.car.carType.car,
                  oper: enumSrv.base.operator.eq
                }
              ]
            },
            {
              name: $filter('i18n')("CAR.CARTYPE.SUV"),
              key: enumSrv.car.key.ctype,
              query: [
                {
                  value: enumSrv.car.carType.suv,
                  oper: enumSrv.base.operator.eq
                }
              ]
            },
            {
              name: $filter('i18n')("CAR.PRICE.LOWER", 3),
              key: enumSrv.car.key.price,
              query: [
                {
                  value: '30000',
                  oper: enumSrv.base.operator.le
                }
              ]
            },
            {
              name: $filter('i18n')("CAR.PRICE.DURING", 3, 5),
              key: enumSrv.car.key.price,
              query: [
                {
                  value: '50000',
                  oper: enumSrv.base.operator.le
                },
                {
                  value: '30000',
                  oper: enumSrv.base.operator.ge
                }
              ]
            }
          ],

          [
            {
              name: $filter('i18n')("CAR.PRICE.DURING", 5, 8),
              key: enumSrv.car.key.price,
              query: [
                {
                  value: '80000',
                  oper: enumSrv.base.operator.le
                },
                {
                  value: '50000',
                  oper: enumSrv.base.operator.ge
                }
              ]
            },
            {
              name: $filter('i18n')("CAR.PRICE.DURING", 8, 12),
              key: enumSrv.car.key.price,
              query: [
                {
                  value: '120000',
                  oper: enumSrv.base.operator.le
                },
                {
                  value: '80000',
                  oper: enumSrv.base.operator.ge
                }
              ]
            },
            {
              name: $filter('i18n')("CAR.PRICE.DURING", 12, 20),
              key: enumSrv.car.key.price,
              query: [
                {
                  value: '200000',
                  oper: enumSrv.base.operator.le
                },
                {
                  value: '120000',
                  oper: enumSrv.base.operator.ge
                }
              ]
            },
            {
              name: $filter('i18n')("CAR.PRICE.UPPER", 20),
              key: enumSrv.car.key.price,
              query: [
                {
                  value: '200000',
                  oper: enumSrv.base.operator.ge
                }
              ]
            }
          ],

          [
            {
              name: $filter('i18n')("CAR.BRAND.DAZHONG"),
              key: enumSrv.car.key.brand,
              query: [
                {
                  value: enumSrv.car.brand.dazhong,
                  oper: enumSrv.base.operator.eq
                }
              ]
            },
            {
              name: $filter('i18n')("CAR.BRAND.FENGTIAN"),
              key: enumSrv.car.key.brand,
              query: [
                {
                  value: enumSrv.car.brand.fengtian,
                  oper: enumSrv.base.operator.eq
                }
              ]
            },
            {
              name: $filter('i18n')("CAR.BRAND.BENCHI"),
              key: enumSrv.car.key.brand,
              query: [
                {
                  value: enumSrv.car.brand.fenchi,
                  oper: enumSrv.base.operator.eq
                }
              ]
            },
            {
              name: $filter('i18n')("CAR.BRAND.AODI"),
              key: enumSrv.car.key.brand,
              query: [
                {
                  value: enumSrv.car.brand.aodi,
                  oper: enumSrv.base.operator.eq
                }
              ]
            }
          ],

          [
            {
              name: $filter('i18n')("CAR.TAG.TAG1"),
              key: enumSrv.car.key.tag,
              query: [
                {
                  value: enumSrv.car.tag.tag1,
                  oper: enumSrv.base.operator.eq
                }
              ]
            },
            {
              name: $filter('i18n')("CAR.TAG.TAG2"),
              key: enumSrv.car.key.tag,
              query: [
                {
                  value: enumSrv.car.tag.tag2,
                  oper: enumSrv.base.operator.eq
                }
              ]
            },
            {
              name: $filter('i18n')("CAR.TAG.TAG3"),
              key: enumSrv.car.key.tag,
              query: [
                {
                  value: enumSrv.car.tag.tag3,
                  oper: enumSrv.base.operator.eq
                }
              ]
            },
            {
              name: $filter('i18n')("全部"),
              icon: 'ion-plus-circled',
              key: enumSrv.car.key.all,
              query: []
            }
          ],
        ];

        /**
         * 向当前查询条件集中添加一项
         * @param sitem
         */
        var addCurSitem = function (sitem) {

        };

        /**
         * 从当前查询条件集中移除一项
         * @param sitem
         */
        var removeCurSitem = function (sitem) {

        };

        /**
         * 清空当前查询条件集
         */
        var clearCurSitem = function (){
          curSitem = {};
        };

        return {
          hsItems: function () {
            return hsItems;
          },
          getCurSitem: function () {
            return curSitem;
          },
          addCurSitem: addCurSitem,
          removeCurSitem: removeCurSitem,
          clearCurSitem: clearCurSitem,
        }
      }
    ];
  }
);
