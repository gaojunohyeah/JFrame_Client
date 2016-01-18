/**
 * Created by gaojun on 15/12/8.
 */

define(
  [
    'lodash',
  ],
  function (_) {
    'use strict';

    return [
      function () {
        return function (array, num) {
          var oldArray = array.concat([]);
          var newArray = [];

          //var totalNum = _.size(array);
          _.forEach(oldArray, function (data, index) {
            var i = Math.floor(index / num);

            if (_.isUndefined(newArray[i]) || _.isNull(newArray[i]) || "" === newArray[i]) {
              newArray[i] = [];
            }
            newArray[i].push(data);
          });

          return newArray;
        }
      }
    ];
  }
);
