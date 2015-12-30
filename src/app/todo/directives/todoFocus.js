/*global angular */
import angular from 'angular';
import '../../modules.js';

/**
 * Directive that places focus on the element it is applied to when the
 * expression it binds to evaluates to true
 */
angular.module('app.todoDirective').directive('todoFocus', ['$timeout', function($timeout) {
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

},]);
