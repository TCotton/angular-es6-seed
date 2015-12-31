'use strict';
import angular from 'angular';
import TodoCtrl from './controllers/todoCtrl.js';
import todoStorage from './services/todoStorage.js';
import localStorage from './services/todoLocalStorage.js';
import api from './services/todoApi.js';
import todoEscape from './directives/todoEscape.js';
import todoFocus from './directives/todoFocus.js';
import header from 'app/todo/views/header.html!text';
import main from 'app/todo/views/main.html!text';
import footer from 'app/todo/views/footer.html!text';
import appModule from 'app/app';

/*
console.log(todoEscape.name);
console.log(localStorage.name);
console.log(todoStorage.name);
console.dir(todoStorage);
*/

export default angular
  .module(appModule.name, [
    todoEscape.name,
    todoFocus.name,
    api.name,
    localStorage.name,
    todoStorage.name,
    TodoCtrl.name,
  ])
  .config(['$stateProvider', function($stateProvider) {

    const resolve = {
      Store: function(todoStorage) {
        // Get the correct module (API or localStorage).
        return todoStorage.then(function(module) {

          console.log('success');
          module.getStore();
          return module;
        }, function(reason) {

          console.log('failure');
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

  },]);

