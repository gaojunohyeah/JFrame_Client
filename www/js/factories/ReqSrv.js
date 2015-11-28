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
        login: function (username, password) {
          return $http.post(host + 'login', {username: username, password: password});
        },
        // logout request
        logout: function (username, accesstoken) {
          return $http.post(host + 'logout', {username: username, accesstoken: accesstoken});
        },
        // get i18n lang file
        getLang: function (lang){
          return $http.post('/js/cfg/i18n/' + lang + '.json');
        }
      }
    }];
  });
