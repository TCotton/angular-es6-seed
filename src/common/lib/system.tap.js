(function(System) {
  'use strict';

  let normalize = System.normalize;
  System.normalize = function(name, parentName, parentAddress) {
    console.log('normalize: ' + JSON.stringify({
        name: name,
        parentName: parentName,
        parentAddress: parentAddress
      }));
    return normalize.call(this, name, parentName, parentAddress);
  };

  let systemLocate = System.locate;
  System.locate = function(load) {
    console.log('locating: ' + JSON.stringify(load));
    return systemLocate.call(this, load);
  };

  let systemFetch = System.fetch;
  System.fetch = function(load) {
    console.log('fetching: ' + JSON.stringify(load));
    return systemFetch.call(this, load);
  };

  let systemTranslate = System.translate;
  System.translate = function(load) {
    console.log('translating: ' + JSON.stringify(load));
    return systemTranslate.call(this, load);
  };

  let systemInstantiate = System.instantiate;
  System.instantiate = function(load) {
    console.log('before instantiate: ' + JSON.stringify(load));
    return systemInstantiate.call(this, load);
  };

}(System));