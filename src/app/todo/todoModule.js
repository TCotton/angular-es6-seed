import angular from 'angular';
import appModule from 'app/app';
import todoTpl from 'app/todo/todo.tpl.html!text';

let todoModule = angular.module('todomvc', [appModule.name]);

todoModule.config(['$stateProvider', function($stateProvider) {

  $stateProvider
    .state('todo', {
      url: '/todo',
      template: todoTpl,
      controller: 'TodoCtrl',
    })
    .state('todo.all', {
      url: '/all',
      template: todoTpl,
      controller: 'TodoCtrl',
    })
    .state('todo.completed', {
      url: '/completed',
      template: todoTpl,
      controller: 'TodoCtrl',
    })
    .state('todo.active', {
      url: '/active',
      templat: todoTpl,
      controller: 'TodoCtrl',
    });
}]);

export default todoModule;
