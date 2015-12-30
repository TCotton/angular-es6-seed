'use strict';
import angular from 'angular';
import 'angular-ui-router';
import 'angular-aria';
import 'angular-sanitize';
import 'api-check';
import 'angular-formly';
import '../jspm_packages/npm/todomvc-app-css@2.0.3/index.css!';
import '../jspm_packages/npm/todomvc-common@1.0.2/base.css!';

// import 'config/config.js';

import './modules.js';

let appModule = angular.module('app', [
  'app.todoController',
  'app.todoDirective',
  'app.todoService',
  'ui.router',
  'ngSanitize',
  'ngAria',
  'formly'
]);

import './todo/index.js';

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
    testing: {
      template: '<h1>TESTING!</h1>',
    },
    header: {
      templateUrl: 'app/todo/views/header.html',
      controller: 'TodoCtrl as TCtrl',
    },
    main: {
      templateUrl: 'app/todo/views/main.html',
      controller: 'TodoCtrl as TCtrl',
    },
    footer: {
      templateUrl: 'app/todo/views/footer.html',
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

}]);

angular.element(document).ready(function() {
  // app.showModuleRelationships();
  return angular.bootstrap(document.body, ['app'], {
    strictDi: true,
  });
});

export default appModule;
