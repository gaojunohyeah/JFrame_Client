/**
 * Created by gaojun on 15/12/2.
 */

define(
  [
    '../enum/Enum_Base',
    '../enum/Enum_Car',
    '../enum/Enum_MsgType',
    '../enum/Enum_Ret',
  ],
  function (base, car, msgType, ret) {
    'use strict';

    return [
      function () {
        this.base = base;
        this.car = car;
        this.msgType = msgType;
        this.ret = ret;
      }
    ];
  }
);
