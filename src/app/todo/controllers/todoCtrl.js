/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

'use strict';
import angular from 'angular';
import '../../modules.js';

class TodoCtrl {

  /**
   * constructor
   * @param $scope {object}
   * @param $filter {function}
   * @param Store {object}
   */
  constructor($scope, $filter, Store) {
    this.$scope = $scope;
    this.$filter = $filter;
    this.store = Store;
    this.todos = $scope.todos = Store.store.todos;

    $scope.newTodo = '';
    $scope.editedTodo = null;

    $scope.$watch('todos', () => {
      $scope.remainingCount = $filter('filter')(this.todos, {completed: false}).length;
      $scope.completedCount = this.todos.length - $scope.remainingCount;
      $scope.allChecked = !$scope.remainingCount;
    }, true);

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams) {
      let status = $scope.status = toParams.status || '';
      $scope.statusFilter = (status === 'active') ?
      {completed: false} : (status === 'completed') ?
      {completed: true} : {};
    });

  }

  /**
   *
   */
  addTodo() {

    let newTodo = {
      title: this.$scope.newTodo.trim(),
      completed: false,
    };

    if (!newTodo.title) {
      return;
    }

    this.$scope.saving = true;
    this.store.insert(newTodo)
      .then(() => {
        this.$scope.newTodo = '';
      })
      .finally(() => {
        this.$scope.saving = false;
      });

  }

  /**
   *
   * @param todo
   */
  editTodo(todo) {
    console.log(typeof todo);

    this.$scope.editedTodo = todo;

    // Clone the original todo to restore it on demand.
    this.$scope.originalTodo = angular.extend({}, todo);

  }

  saveEdits(todo, event) {
    console.log(typeof todo);
    console.log(typeof event);

    // Blur events are automatically triggered after the form submit event.
    // This does some unfortunate logic handling to prevent saving twice.
    if (event === 'blur' && $scope.saveEvent === 'submit') {
      this.$scope.saveEvent = null;
      return;
    }

    this.$scope.saveEvent = event;

    if (this.$scope.reverted) {
      // Todo edits were reverted-- don't save.
      this.$scope.reverted = null;
      return;
    }

    todo.title = todo.title.trim();

    if (todo.title === this.$scope.originalTodo.title) {
      this.$scope.editedTodo = null;
      return;
    }

    this.store[todo.title ? 'put' : 'delete'](todo)
      .then(function success() {
      }, function error() {

        todo.title = this.$scope.originalTodo.title;
      }.bind(this))
      .finally(() => {
        this.$scope.editedTodo = null;
      });
  }

  revertEdits() {

    this.todos[this.todos.indexOf(todo)] = this.$scope.originalTodo;
    this.$scope.editedTodo = null;
    this.$scope.originalTodo = null;
    this.$scope.reverted = true;

  }

  removeTodo(todo) {
    console.log(typeof todo);
    this.store.deleteTodo(todo);
  }

  saveTodo(todo) {
    console.log(typeof todo);
    this.store.put(todo);
  }

  toggleCompleted(todo, completed) {
    console.log(typeof todo);
    console.log(typeof completed);

    if (angular.isDefined(completed)) {
      todo.completed = completed;
    }
    this.store.put(todo, this.todos.indexOf(todo))
      .then(function success() {
      }, () => {
        todo.completed = !todo.completed;
      });

  }

  clearCompletedTodos() {
    this.store.clearCompleted();
  }

  markAll(completed) {
    this.todos.forEach((todo) => {
      if (todo.completed !== completed) {
        this.toggleCompleted(todo, completed);
      }
    });
  }
}

export default angular.module('app.todoController').controller('TodoCtrl', ['$scope', '$filter', 'Store', function($scope, $filter, Store) {
  return new TodoCtrl($scope, $filter, Store);
},]);
