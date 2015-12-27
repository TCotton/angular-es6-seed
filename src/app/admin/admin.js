import angular from 'angular';
import adminTpl from 'app/admin/admin.tpl';
import builderModule from './builder/builder';
import usersModule from './users/users';

export var adminModule = angular.module('admin', [builderModule.name, usersModule.name, adminTpl.name]);

adminModule.config(function($stateProvider) {
  $stateProvider.state('admin', {
    url: '/admin',
    templateUrl: 'app/admin/admin.tpl.html',
    controller: 'AdminController',
  });

  $stateProvider.state('admin.builder', {
    url: '/builder',
    templateUrl: 'app/admin/builder/builder.tpl.html',
    controller: 'BuilderController',
    parent: 'admin',
  });

  $stateProvider.state('admin.users', {
    url: '/users',
    templateUrl: 'app/admin/users/users.tpl.html',
    controller: 'UsersController',
    parent: 'admin',
  });
});

adminModule.controller('AdminController', function() {
  console.log('admin!');
});
