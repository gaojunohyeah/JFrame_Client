/**
 * Created by gaojun on 15/11/23.
 */

define(
  [
    'config',
  ],
  function (config) {
    'use strict';

    return ['$http', function ($http) {
      var host = config.local_url;
      return {
        // login request
        login: function (user) {
          return $http.post(host + 'login', {user: user}
            , {ignoreAuthModule: true});
        },
        // logout request
        logout: function () {
          return $http.post(host + 'logout', {}, {ignoreAuthModule: true});
        },
        // game request
        game: function () {
          return $http.post(host + 'game', {});
        },
        // get i18n lang file
        getLang: function (lang) {
          return $http.post('/js/cfg/i18n/' + lang + '.json');
        }
      }
    }];
  });
