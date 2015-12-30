'use strict';

class Store {

  constructor($resource) {

    this.todos = [];

    this.api = $resource('/api/todos/:id', null,
      {
        update: {method: 'PUT'},
      });

  }

  clearCompleted() {

    let originalTodos = this.todos.slice(0);

    let incompleteTodos = this.todos.filter(function(todo) {
      return !todo.completed;
    });

    angular.copy(incompleteTodos, this.todos);

    return this.api.delete(() => {
    }, () => {
      angular.copy(originalTodos, this.todos);
    });

  }

  deleteTodo(todo) {

    let originalTodos = this.todos.slice(0);

    this.todos.splice(this.todos.indexOf(todo), 1);

    return this.api.delete({id: todo.id},
      () => {
      }, () => {
        angular.copy(originalTodos, this.todos);
      });
  }

  getStore() {

    return this.api.query((resp) => {
      angular.copy(resp, this.todos);
    });

  }

  insert(todo) {

    let originalTodos = this.todos.slice(0);

    return this.api.save(todo,
      (resp) => {
        todo.id = resp.id;
        this.todos.push(todo);
      }, () => {
        angular.copy(originalTodos, this.todos);
      }).$promise;
  }

  put(todo) {
    return this.api.update({id: todo.id}, todo).$promise;
  }

}

angular.module('todomvc').factory('api', ['$resource', function($resource) {
  return new Store($resource);
}]);