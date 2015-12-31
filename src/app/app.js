'use strict';
import '../assets/todo/base.js';
import angular from 'angular';
import 'angular-ui-router';
import 'angular-aria';
import 'angular-sanitize';
import 'api-check';
import 'angular-formly';
import 'angular-deferred-bootstrap';

// temp TODOMvc css files
import '../assets/todo/base.css!';
import '../assets/todo/index.css!';

// templates
import header from 'app/todo/views/header.html!text';
import main from 'app/todo/views/main.html!text';
import footer from 'app/todo/views/footer.html!text';

// TODOMvc components
import 'app/todo/controllers/todoCtrl.js';
import 'app/todo/services/todoStorage.js';
import 'app/todo/services/todoLocalStorage.js';
import 'app/todo/services/todoApi.js';
import 'app/todo/directives/todoEscape.js';
import 'app/todo/directives/todoFocus.js';

// constants
import AppConstants from 'app/config/config.js';

const appModule = angular.module('app', [
  'app.todoController',
  'app.todoDirective',
  'app.todoService',
  'ui.router',
  'ngSanitize',
  'ngAria',
  'formly',
  AppConstants.name,
]);

appModule.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', function($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
  });

  $httpProvider.useApplyAsync(true);

  const resolve = {
    Store: function(todoStorage) {
      // Get the correct module (API or localStorage).
      return todoStorage.then(function(module) {
        module.getStore();
        return module;
      }, function(reason) {
        console.log('Failed: ' + '%0', reason);
      }, function(update) {
        console.log('Got notification: ' + '%0', update);
      });
    },
  };

  const views = {
    header: {
      template: header,
      controller: 'TodoCtrl as TCtrl',
    },
    main: {
      template: main,
      controller: 'TodoCtrl as TCtrl',
    },
    footer: {
      template: footer,
      controller: 'TodoCtrl as TCtrl',
    },
  };

  $stateProvider
    .state('app', {
      url: '/',
      views: views,
      resolve: resolve,
    })
    .state('app.status', {
      parent: 'app',
      url: ':status',
      views: views,
      resolve: resolve,
    });

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise('/');

},]);

// use deferredBootstrapper to load constants
deferredBootstrapper.bootstrap({
  element: document.body,
  module: 'app',
  strictDi: true,
  resolve: {
    AppConstants: ['$http', function($http) {
      return $http.get('/app/config/config.js');
    }],
  },
  onError: function(error) {
    console.log('Could not bootstrap, error: ' + '\n');
    console.dir(error);
  },
});

export default appModule;
