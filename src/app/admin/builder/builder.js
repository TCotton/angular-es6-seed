import angular from 'angular';
import modalModule from 'common/components/modal';
import builderTpl from 'app/admin/builder/builder.tpl';

var builderModule = angular.module('admin.builder', [modalModule.name, builderTpl.name]);

builderModule.controller('BuilderController', function() {
  console.log('builder!');
});

export default builderModule;
