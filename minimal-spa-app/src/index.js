System.register([], function(_export, _context) {
    // Inject the application here:
    // var WuxDOM,WUX,APP;
    // ...
    return {
      execute: function() {
        _export({
          bootstrap: (props) => {
            return Promise.resolve().then(() => {
              // One-time initialization code goes here
              console.log('[' + props.name + '] bootstrap...');
            });
          },
          mount: (props) => {
            return Promise.resolve().then(() => {
              // Do framework UI rendering here
              console.log('[' + props.name + '] mount...');
              // Use micro-wux application here:
              // WuxDOM.render(new APP.Main(), 'single-spa-application:' + props.name);
              document.getElementById("single-spa-application:" + props.name).innerHTML = 'Hello world!';
            });
          },
          unmount: (props) => {
            return Promise.resolve().then(() => {
              // Do framework UI unrendering here
              console.log('[' + props.name + '] unmount...');
              // Use micro-wux application here:
              // WuxDOM.unmount('single-spa-application:' + props.name);
              document.getElementById("single-spa-application:" + props.name).innerHTML = '';
            });
          },
          unload: (props) => {
            return Promise.resolve().then(() => {
              // Hot-reloading implementation goes here
              console.log('[' + props.name + '] unload...');
            });
          }
        });
      }
    }
  });