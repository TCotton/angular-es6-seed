'use strict';
import angular from 'angular';
import 'angular-ui-router';
import 'angular-aria';
import 'angular-sanitize';
import 'api-check';
import 'angular-formly';
import router from 'lookfirst/oclazyload-systemjs-router';
import futureRoutes from 'app/routes.json!';
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
  'formly',
]);

appModule.config(router(appModule, futureRoutes));

appModule.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', function($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
  });

  $httpProvider.useApplyAsync(true);

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise('/');

}]);

angular.element(document).ready(function() {
  // appDebug.showModuleRelationships();
  return angular.bootstrap(document.body, ['app'], {
    strictDi: true,
  });
});

export default appModule;
