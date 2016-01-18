/**
 * Created by gaojun on 15/11/26.
 */

/**
 * 通过requirejs进行js加载
 * 为方便后期打包剔除多余的js
 * (特别是打包需要使用压缩和混淆后的js)
 * 所有lib下的js必须通过此文件进行引用
 */
requirejs.config({
  baseUrl: 'js',

  paths: {
    config: './cfg/config',
    lang: './cfg/lang',
    //enums: './enum/Enum',
    sprintf: './util/sprintf',

    tweenMax: '../lib/gsap/src/minified/TweenMax.min',

    lodash: '../lib/lodash/lodash',//.min',
    angular: '../lib/ionic/js/angular/angular',//.min',
    angularAnimate: '../lib/ionic/js/angular/angular-animate',//.min',
    angularResource: '../lib/ionic/js/angular/angular-resource',//.min',
    angularSanitize: '../lib/ionic/js/angular/angular-sanitize',//.min',
    uiRouter: '../lib/ionic/js/angular-ui/angular-ui-router',//.min',
    ngCookies: '../lib/angular-cookies/angular-cookies',//.min',
    ngHttpAuth: '../lib/angular-http-auth/src/http-auth-interceptor',
    ngLocalStorage: '../lib/angular-local-storage/dist/angular-local-storage',//.min',
    ngAnimate: '../lib/angular-animate/angular-animate',//.min',
    ngFx: '../lib/ngFx/dist/ngFx',//.min',
    ionic: '../lib/ionic/js/ionic.bundle',//.min',
    //ionicAngular:       '../lib/ionic/js/ionic-angular',//.min',

    jquery: '../lib/jquery/jquery',//.min',
  },

  shim: {
    angular: {
      exports: 'angular'
    },

    angularAnimate: {
      deps: ['angular']
    },

    angularResource: {
      deps: ['angular']
    },

    angularSanitize: {
      deps: ['angular']
    },

    uiRouter: {
      deps: ['angular']
    },

    ngCookies: {
      deps: ['angular']
    },

    ngHttpAuth: {
      deps: ['angular']
    },

    ngLocalStorage: {
      deps: ['angular']
    },

    ngAnimate: {
      deps: ['angular']
    },

    ngFx: {
      deps: [
        'ngAnimate',
        'tweenMax'
      ]
    },

    ionic: {
      deps: [
        'angular'
      ],
      exports: 'ionic'
    },

    ionicAngular: {
      deps: [
        'angular',
        'ionic',
        'uiRouter',
        'angularAnimate',
        'angularSanitize'
      ]
    },

  },

  priority: [
    'angular',
    'ionic'
  ],

  waitSeconds: 60,

  //urlArgs: "bust=" + (new Date()).getTime(),  //防止读取缓存，调试用
});
