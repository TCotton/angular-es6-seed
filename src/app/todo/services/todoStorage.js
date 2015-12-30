/*global angular */
'use strict';
import angular from 'angular';

/**
 * Services that persists and retrieves todos from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */

export default class ToDoStorage {
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