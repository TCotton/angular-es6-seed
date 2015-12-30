/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

'use strict';

class TodoCtrl {

  constructor($scope, $routeParams, $filter, Store) {
    this.$scope = $scope;
    this.$routeParams = $routeParams;
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

  editTodo(todo) {

    this.$scope.editedTodo = todo;
    // Clone the original todo to restore it on demand.
    this.$scope.originalTodo = angular.extend({}, todo);

  }

  saveEdits(todo, event) {

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
        $scope.editedTodo = null;
      });
  }

  revertEdits() {

    this.todos[this.todos.indexOf(todo)] = this.$scope.originalTodo;
    this.$scope.editedTodo = null;
    this.$scope.originalTodo = null;
    this.$scope.reverted = true;

  }

  removeTodo(todo) {
    this.store.deleteTodo(todo);
  }

  saveTodo(todo) {
    this.store.put(todo);
  }

  toggleCompleted(todo, completed) {

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

angular.module('todomvc').controller('TodoCtrl', ['$scope', '$routeParams', '$filter', 'Store', function ($scope, $routeParams, $filter, Store) {
  return new TodoCtrl($scope, $routeParams, $filter, Store);
}]);
