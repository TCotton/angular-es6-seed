'use strict';
import angular from 'angular';
import router from 'lookfirst/oclazyload-systemjs-router';
import futureRoutes from 'app/routes.json!';

let appModule = angular.module('app', []);

appModule.config(router(appModule, futureRoutes));

appModule.config(function($locationProvider, $httpProvider, $urlRouterProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
  });
  $httpProvider.useApplyAsync(true);
  return $urlRouterProvider.otherwise('/todo');
});

angular.element(document).ready(function() {
  // app.showModuleRelationships();
  return angular.bootstrap(document.body, ['app'], {
    strictDi: false,
  });
});

export default appModule;
