/*global angular */
'use strict';
import angular from 'angular';
import '../../modules.js';

/**
 * Services that persists and retrieves todos from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */

class ToDoStorage {
  constructor($http, $injector) {
    // Detect if an API backend is present. If so, return the API module, else
    // hand off the localStorage adapter
    return $http.get('/api')
      .then(function() {

        return $injector.get('api');
      }, function() {

        return $injector.get('localStorage');
      });
  }
}

export default angular.module('app.todoService').factory('todoStorage', ['$http', '$injector', function($http, $injector) {
  return new ToDoStorage($http, $injector);
},]);
