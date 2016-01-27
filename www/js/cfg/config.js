/**
 * Created by gaojun on 15/11/19.
 */

define([
  'lodash'
], function (_) {
  "use strict";

  /**
   * To add a setting, you MUST define a default. Also,
   * THESE ARE ONLY DEFAULTS.
   * They are overridden by config.js in the root directory
   * @type {Object}
   */
  var defaults = {
    // name
    name: "JFrame",

    /**
     * l_web_url: web环境下的服务器ip
     * l_dev_url: 移动端下的服务端ip
     * 系统启动后会根据app端或是web端进行local_url设置
     */
    l_web_url: "http://" + window.location.hostname + ":8100/server/",
    l_dev_url: "http://192.168.111.116:3000/",
    local_url: "",

    resource_url: "http://192.168.111.116:3333",

    // default language
    default_language: "zh_CN",
    // all available language
    languages: ["zh_CN", "en_US"],

    // deafult cookie name
    cookie_user_name: "JFRAME_USER_COOKIE",

    /*
     * default cookie expire time
     * default value : 30 minutes
     */
    cookie_expiration_time: 30 * 60 * 1000,

    /*
     * default per search result page size
     * default value : 2
     */
    default_page_size: 2,

    /*
     * default price unit
     * default value : 10000
     */
    default_price_unit: 10000,
  };

  // This initializes a new hash on purpose, to avoid adding parameters to
  // config.js without providing sane defaults
  var settings = {};
  _.each(defaults, function (value, key) {
    //settings[key] = typeof options[key] !== 'undefined' ? options[key] : defaults[key];
    settings[key] = defaults[key];
  });

  return settings;
});
