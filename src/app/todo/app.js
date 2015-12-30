/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
angular.module('todomvc', ['ngRoute', 'ngResource', 'ui.router'])
  .config(['$routeProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider', function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider) {
    'use strict';

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
        templateUrl: 'js/views/header.html',
        controller: 'TodoCtrl as TCtrl',
      },
      main: {
        templateUrl: 'js/views/main.html',
        controller: 'TodoCtrl as TCtrl',
      },
      footer: {
        templateUrl: 'js/views/footer.html',
        controller: 'TodoCtrl as TCtrl',
      },
    };

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false,
    });

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