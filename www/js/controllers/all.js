/**
 * Created by gaojun on 15/11/26.
 */

define(
  [
    // Standard Libs
    'angular',
    'lodash',
    'config',

    // controllers
    './AppCtrl',
    './LoginCtrl',
    './SignupCtrl',
    './HomeCtrl',
    './CarCtrl',
    './SettingCtrl',
  ],
  function (angular, _, config
    , appCtrl, loginCtrl, signupCtrl, homeCtrl, carCtrl, settingCtrl) {
    'use strict';

    var module = angular.module(config.name + '.controllers', []);

    module.controller('appCtrl', appCtrl);
    module.controller('loginCtrl', loginCtrl);
    module.controller('signupCtrl', signupCtrl);
    module.controller('homeCtrl', homeCtrl);
    module.controller('carCtrl', carCtrl);
    module.controller('settingCtrl', settingCtrl);
  }
);
