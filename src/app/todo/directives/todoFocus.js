import todoModule from '../todoModule';

/**
 * Directive that places focus on the element it is applied to when the expression it binds to evaluates to true
 appModule.config(['$locationProvider', '$httpProvider', '$urlRouterProvider',
 function($locationProvider, $httpProvider, $urlRouterProvider) {
   angular.module('portfolioApp.blogPagesController')
   .controller('BlogCatController',
   ['$scope', '$location', 'BlogDataService', '$log', '$angularCacheFactory', '$rootScope', '_',
   function($scope, $location, BlogDataService, $log, $angularCacheFactory, $rootScope, _) {

 */
todoModule.directive('todoFocus', ['$timeout', function($timeout) {
  'use strict';
  return function(scope, elem, attrs) {
    scope.$watch(attrs.todoFocus, function(newVal) {
      if (newVal) {
        $timeout(function() {
          elem[0].focus();
        }, 0, false);
      }
    });
  };
}]);

export default todoModule;
