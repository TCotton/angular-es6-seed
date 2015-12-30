'use strict';
import angular from 'angular';

export default class Store {

  constructor($q) {
    this.deferred = $q.defer();
    this.store = {};
    this.store.todos = [];
    this.STORAGE_ID = 'todos-angularjs';

    this.store._getFromLocalStorage = function _getFromLocalStorage() {
      return JSON.parse(sessionStorage.getItem(this.STORAGE_ID) || '[]');
    };

    this.store._saveToLocalStorage = function _saveToLocalStorag(todos) {
      sessionStorage.setItem(this.STORAGE_ID, JSON.stringify(todos));
    };

  }

  clearCompleted() {

    let incompleteTodos = this.store.todos.filter(function(todo) {
      return !todo.completed;
    });

    angular.copy(incompleteTodos, this.store.todos);

    this.store._saveToLocalStorage(this.store.todos);
    this.deferred.resolve(this.store.todos);

    return this.deferred.promise;
  }

  deleteTodo(todo) {

    this.store.todos.splice(this.store.todos.indexOf(todo), 1);

    this.store._saveToLocalStorage(this.store.todos);
    this.deferred.resolve(this.store.todos);

    return this.deferred.promise;
  }

  getStore() {

    angular.copy(this.store._getFromLocalStorage(), this.store.todos);
    this.deferred.resolve(this.store.todos);

    return this.deferred.promise;
  }

  insert(todo) {

    this.store.todos.push(todo);

    this.store._saveToLocalStorage(this.store.todos);
    this.deferred.resolve(this.store.todos);

    return this.deferred.promise;
  }

  put(todo, index) {

    this.store.todos[index] = todo;

    this.store._saveToLocalStorage(this.store.todos);
    this.deferred.resolve(this.store.todos);

    return this.deferred.promise;

  }

}

