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
      
      singleSpa.registerApplication({
        name: '@dew/micro-wux-app',
        app: () => System.import('@dew/micro-wux-app'),
        activeWhen: ['/', (location) => location.pathname.startsWith('/index')],
        customProps: (name, location) => {
          return {
            title: 'Test'
          }
        },
      });
      
      singleSpa.start();
    }
  }
});