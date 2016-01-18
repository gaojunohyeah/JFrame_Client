/**
 * Created by gaojun on 15/12/2.
 */

define(
  [],
  function () {
    return {
      // 车类型
      carType: {
        car: 1,       // 轿车
        suv: 2,       // SUV
      },

      // 品牌
      brand: {
        dazhong: 1,   // 大众
        fengtian: 2,  // 丰田
        benchi: 3,    // 奔驰
        aodi: 4,      // 奥迪
      },

      // 标签
      tag: {
        tag1: 1,    // 性价比高
        tag2: 2,    // 车主急售
        tag3: 3,    // 准新车
      },

      // 查询关键字
      key: {
        all: "*",
        city: 'city',
        ctype: 'carType',
        color: 'color',
        price: 'price',
        brandId: 'brandId',
        seriesId: 'seriesId',
        tag: 'tag',
      }
    }
  }
);
