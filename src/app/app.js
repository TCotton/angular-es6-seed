'use strict';
import '../assets/todo/base.js';
import angular from 'angular';
import 'angular-ui-router';
import 'angular-aria';
import 'angular-sanitize';
import 'api-check';
import 'angular-formly';
import '../assets/todo/base.css!';
import '../assets/todo/index.css!';
import header from 'app/todo/views/header.html!text';
import main from 'app/todo/views/main.html!text';
import footer from 'app/todo/views/footer.html!text';
import 'app/todo/controllers/todoCtrl.js';
import 'app/todo/services/todoStorage.js';
import 'app/todo/services/todoLocalStorage.js';
import 'app/todo/services/todoApi.js';
import 'app/todo/directives/todoEscape.js';
import 'app/todo/directives/todoFocus.js';
import 'app/todo/index.js';

// import 'config/config.js';

// import './modules.js';

const appModule = angular.module('app', [
  'app.todoController',
  'app.todoDirective',
  'app.todoService',
  'ui.router',
  'ngSanitize',
  'ngAria',
  'formly',
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

angular.element(document).ready(function() {
  // appDebug.showModuleRelationships();
  return angular.bootstrap(document.body, ['app'], {
    strictDi: true,
  });
});

export default appModule;
