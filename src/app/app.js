'use strict';
import angular from 'angular';
import 'angular-ui-router';

let appModule = angular.module('app', ['ui.router']);

appModule.config(['$routeProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider', function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

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
      templateUrl: 'todo/views/header.html',
      controller: 'TodoCtrl as TCtrl',
    },
    main: {
      templateUrl: 'todo/views/main.html',
      controller: 'TodoCtrl as TCtrl',
    },
    footer: {
      templateUrl: 'todo/views/footer.html',
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
