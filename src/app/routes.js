'use strict';

let appRoutes = function appRoutes($stateProvider, templates) {

  const resolve = {
    Store: function(todoStorage) {
      // Get the correct module (API or localStorage).
      return todoStorage.then(function(module) {
        module.getStore();
        return module;
      }, function(reason) {
        console.log('Failed: ' + '%0', reason);
      }, function(update) {
        console.log('Got notification: ' + '%0', update);
      });
    },
  };

  $stateProvider
    .state('app', {
      url: '/',
      views: templates,
      resolve: resolve,
    })
    .state('app.status', {
      parent: 'app',
      url: ':status',
      views: templates,
      resolve: resolve,
    });

};

export { appRoutes };
