/**
 * Created by gaojun on 16/1/13.
 */

define(
  [],
  function () {
    'use strict';

    return ['$filter', 'reqSrv', 'enums',
      function ($filter, reqSrv, enums) {
        // 首页快速搜索
        this.hsItems = [
          [
            {
              name: $filter('i18n')("CAR.CARTYPE.CAR"),
              key: enums.car.key.ctype,
              query: [
                {
                  value: enums.car.carType.car,
                  oper: enums.base.operator.e
                }
              ]
            },
            {
              name: $filter('i18n')("CAR.CARTYPE.SUV"),
              key: enums.car.key.ctype,
              query: [
                {
                  value: enums.car.carType.suv,
                  oper: enums.base.operator.e
                }
              ]
            },
            {
              name: $filter('i18n')("CAR.PRICE.LOWER", 3),
              key: enums.car.key.price,
              query: [
                {
                  value: '30000',
                  oper: enums.base.operator.lte
                }
              ]
            },
            {
              name: $filter('i18n')("CAR.PRICE.DURING", 3, 5),
              key: enums.car.key.price,
              query: [
                {
                  value: '50000',
                  oper: enums.base.operator.lte
                },
                {
                  value: '30000',
                  oper: enums.base.operator.gte
                }
              ]
            }
          ],

          [
            {
              name: $filter('i18n')("CAR.PRICE.DURING", 5, 8),
              key: enums.car.key.price,
              query: [
                {
                  value: '80000',
                  oper: enums.base.operator.lte
                },
                {
                  value: '50000',
                  oper: enums.base.operator.gte
                }
              ]
            },
            {
              name: $filter('i18n')("CAR.PRICE.DURING", 8, 12),
              key: enums.car.key.price,
              query: [
                {
                  value: '120000',
                  oper: enums.base.operator.lte
                },
                {
                  value: '80000',
                  oper: enums.base.operator.gte
                }
              ]
            },
            {
              name: $filter('i18n')("CAR.PRICE.DURING", 12, 20),
              key: enums.car.key.price,
              query: [
                {
                  value: '200000',
                  oper: enums.base.operator.lte
                },
                {
                  value: '120000',
                  oper: enums.base.operator.gte
                }
              ]
            },
            {
              name: $filter('i18n')("CAR.PRICE.UPPER", 20),
              key: enums.car.key.price,
              query: [
                {
                  value: '200000',
                  oper: enums.base.operator.gte
                }
              ]
            }
          ],

          [
            {
              name: $filter('i18n')("CAR.BRAND.DAZHONG"),
              key: enums.car.key.brand,
              query: [
                {
                  value: enums.car.brand.dazhong,
                  oper: enums.base.operator.e
                }
              ]
            },
            {
              name: $filter('i18n')("CAR.BRAND.FENGTIAN"),
              key: enums.car.key.brand,
              query: [
                {
                  value: enums.car.brand.fengtian,
                  oper: enums.base.operator.e
                }
              ]
            },
            {
              name: $filter('i18n')("CAR.BRAND.BENCHI"),
              key: enums.car.key.brand,
              query: [
                {
                  value: enums.car.brand.fenchi,
                  oper: enums.base.operator.e
                }
              ]
            },
            {
              name: $filter('i18n')("CAR.BRAND.AODI"),
              key: enums.car.key.brand,
              query: [
                {
                  value: enums.car.brand.aodi,
                  oper: enums.base.operator.e
                }
              ]
            }
          ],

          [
            {
              name: $filter('i18n')("CAR.TAG.TAG1"),
              key: enums.car.key.tag,
              query: [
                {
                  value: enums.car.tag.tag1,
                  oper: enums.base.operator.e
                }
              ]
            },
            {
              name: $filter('i18n')("CAR.TAG.TAG2"),
              key: enums.car.key.tag,
              query: [
                {
                  value: enums.car.tag.tag2,
                  oper: enums.base.operator.e
                }
              ]
            },
            {
              name: $filter('i18n')("CAR.TAG.TAG3"),
              key: enums.car.key.tag,
              query: [
                {
                  value: enums.car.tag.tag3,
                  oper: enums.base.operator.e
                }
              ]
            },
            {
              name: $filter('i18n')("全部"),
              icon: 'ion-plus-circled',
              key: enums.car.key.all,
              query: []
            }
          ],
        ];

        // 价格区间默认搜索项
        this.pricePreItems = [
          {
            name: $filter('i18n')("CAR.PRICE.NONE"),
            key: enums.car.key.all,
            query: [
              {
                value: '0',
                oper: enums.base.operator.gte
              },
              {
                value: '0',
                oper: enums.base.operator.lte
              }
            ]
          },
          {
            name: $filter('i18n')("CAR.PRICE.LOWER", 3),
            key: enums.car.key.price,
            query: [
              {
                value: '0',
                oper: enums.base.operator.gte
              },
              {
                value: '3',
                oper: enums.base.operator.lte
              }
            ]
          },
          {
            name: $filter('i18n')("CAR.PRICE.DURING", 3, 5),
            key: enums.car.key.price,
            query: [
              {
                value: '3',
                oper: enums.base.operator.gte
              },
              {
                value: '5',
                oper: enums.base.operator.lte
              }
            ]
          },
          {
            name: $filter('i18n')("CAR.PRICE.DURING", 5, 10),
            key: enums.car.key.price,
            query: [
              {
                value: '5',
                oper: enums.base.operator.gte
              },
              {
                value: '10',
                oper: enums.base.operator.lte
              }
            ]
          },
          {
            name: $filter('i18n')("CAR.PRICE.DURING", 10, 15),
            key: enums.car.key.price,
            query: [
              {
                value: '10',
                oper: enums.base.operator.gte
              },
              {
                value: '15',
                oper: enums.base.operator.lte
              }
            ]
          },
          {
            name: $filter('i18n')("CAR.PRICE.DURING", 15, 20),
            key: enums.car.key.price,
            query: [
              {
                value: '15',
                oper: enums.base.operator.gte
              },
              {
                value: '20',
                oper: enums.base.operator.lte
              }
            ]
          },
          {
            name: $filter('i18n')("CAR.PRICE.DURING", 20, 30),
            key: enums.car.key.price,
            query: [
              {
                value: '20',
                oper: enums.base.operator.gte
              },
              {
                value: '30',
                oper: enums.base.operator.lte
              }
            ]
          },
          {
            name: $filter('i18n')("CAR.PRICE.DURING", 30, 60),
            key: enums.car.key.price,
            query: [
              {
                value: '30',
                oper: enums.base.operator.gte
              },
              {
                value: '60',
                oper: enums.base.operator.lte
              }
            ]
          },
          {
            name: $filter('i18n')("CAR.PRICE.UPPER", 60),
            key: enums.car.key.price,
            query: [
              {
                value: '60',
                oper: enums.base.operator.gte
              },
              {
                value: '0',
                oper: enums.base.operator.lte
              }
            ]
          }
        ];

        /**
         * 我要卖车页面的问题列表
         * @type {Array}
         */
        this.sellQuestions = [
          {
            question: $filter('i18n')("CAR.SELL.QUES1"),
            answer: [
              $filter('i18n')("CAR.SELL.QUES1.ANSWER1"),
              $filter('i18n')("CAR.SELL.QUES1.ANSWER2"),
              $filter('i18n')("CAR.SELL.QUES1.ANSWER3"),
              $filter('i18n')("CAR.SELL.QUES1.ANSWER4"),
              $filter('i18n')("CAR.SELL.QUES1.ANSWER5"),
            ]
          },
          {
            question: $filter('i18n')("CAR.SELL.QUES2"),
            answer: [
              $filter('i18n')("CAR.SELL.QUES2.ANSWER1"),
              $filter('i18n')("CAR.SELL.QUES2.ANSWER2"),
            ]
          },
          {
            question: $filter('i18n')("CAR.SELL.QUES3"),
            answer: [
              $filter('i18n')("CAR.SELL.QUES3.ANSWER1"),
            ]
          }
        ];
      }
    ];
  }
);
