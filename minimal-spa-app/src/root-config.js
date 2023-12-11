System.register(["single-spa"], function(_export, _context) {
  var singleSpa;
  return {
    setters: [
      function(module) {
        singleSpa = module;
      }
    ],
    execute: function() {
      console.log('[@dew/root-config] execute...');
      
      singleSpa.registerApplication(
        '@dew/micro-wux-app',
        () => System.import('@dew/micro-wux-app'),
        location => true
      );
      
      singleSpa.start();
    }
  }
});