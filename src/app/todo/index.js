'use strict';
import angular from 'angular';
import TodoCtrl from './controllers/todoCtrl.js';
import ToDoStorage from './services/todoStorage.js';
import Store from './services/todoStorage.js';
import StoreAPI from './services/todoApi.js';
import '../modules.js';

// controllers
angular.module('app.todoController').controller('TodoCtrl', ['$scope', '$routeParams', '$filter', 'Store', function($scope, $routeParams, $filter, Store) {
  return new TodoCtrl($scope, $routeParams, $filter, Store);
},]);

// factories and services
angular.module('app.todoService').factory('todoStorage', ['$http', '$injector', function($http, $injector) {
  console.log(typeof ToDoStorage);
  console.dir(ToDoStorage);
  return new ToDoStorage($http, $injector);
},]);

angular.module('app.todoService').factory('localStorage', [function($q) {
  return new Store($q);
},]);

angular.module('app.todoService').factory('api', ['$resource', function($resource) {
  return new StoreAPI($resource);
},]);

// directives
import './directives/todoEscape.js';
import './directives/todoFocus.js';
