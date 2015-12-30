System.trace = true;

(function(app, window, undefined) {
  'use strict';

  app.showModuleRelationships = function() {
    // build up an array of modules
    let modules = Object.keys(System.loads)
      .map(function(moduleName) {
        return System.loads[moduleName];
      });

    /**
     * clean up and remove the first part of the URL
     * it is unnecessary to display the full URL in the yuml.me diagram
     * @param module
     * @returns {XML|void|string|*}
     */
    function displayName(module) {
      return module
        .replace(System.baseURL, '');
    }

    /**
     * Build up an array of module definitions
     * @type {Array}
     */
    let moduleDefinitions = modules.map(function(module) {
      let name = displayName(module.name);
      return '[' + name + '|' + module.metadata.format + ']';
    });

    /**
     * Build up module dependency definitions array
     * @type {Array}
     */
    let dependencyDefinitions = [];

    modules
      .filter(function(module) {
        return module.deps.length > 0;
      })
      .forEach(function(module) {
        let name = displayName(module.name);

        let dependencies = module.deps
          .map(function(dependency){
            return System.normalizeSync(dependency, module.name, module.address);
          })
          .map(displayName)
          .map(function(dependencyName) {
            return '[' + name + ']->[' + dependencyName + ']';
          });

        dependencyDefinitions = dependencyDefinitions.concat(dependencies);
      });

    let definitions = moduleDefinitions.concat(dependencyDefinitions);

    // pass module definitions to yuml.me site
    window.open('http://yuml.me/diagram/plain/class/' + definitions);

  };
  // create namespace -> change namespace to whatever suits your codebase. Here it is called 'app'
}((window.appDebug = typeof window.appDebug !== 'undefined' ? window.appDebug : Object.create(Object.prototype)), window));