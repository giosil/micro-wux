# micro-WUX - Wrapped User Experience &middot; [![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)

[WUX](https://github.com/giosil/wux) is a simple Javascript library to build component based user interface.

Here we examine how to integrate the WUX library in [single-spa](https://single-spa.js.org/) apps for front-end microservices development through some examples:

- `micro-wux-app`   - typescript application with WUX library
- `single-spa-app`  - single-spa application
- `single-spa-root` - single-spa root config 

The single-spa root config has been created with `npx create-single-spa`.

## Build micro-WUX

- `git clone https://github.com/giosil/micro-wux.git`
- `npm install typescript -g`
- `tsc --declaration --project ./micro-wux-app/ts/wux/tsconfig.json`

## Build and deploy micro-wux App as microfrontend single-spa

- `cd micro-wux-app`
- `.\build.cmd`  or `./build.sh`  - compile micro-wux application
- `.\deploy.cmd` or `./deploy.sh` - generate `index.js` in `micro-wux-app/src` folder

## Build and deploy micro-wux App as microfrontend single-spa with npm

- `cd micro-wux-app`
- `npm run build`  - compile micro-wux application
- `npm run deploy` - copy `index.js` and `micro-wux-app.js` in `micro-wux-app/src` folder

## Run

Start **single-spa-app**:

- `cd single-spa-app`
- `npm install`
- `npm start` - to serve single-spa applications at http://localhost:8080/index.js

Start **single-spa-root**:

- `cd single-spa-root`
- `npm install`
- `npm start` - to start single-spa root config at http://localhost:9000

## Example of micro-WUX application

```typescript
namespace APP {

  export class Main extends WUX.WComponent {
    protected render() {
      return '<div>Hello World.</div>';
    }
  }

}
```

## Run micro-WUX application standalone

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Micro WUX</title>
  </head>
  <body>
    <div id="view-root"></div>

    <script src="dist/wux.min.js"></script>
    <script src="dist/app.min.js"></script>
    <script type="text/javascript">
      WuxDOM.render(new APP.Main(), 'view-root');
    </script>
  </body>
</html>
```

## Single-spa application

```javascript
import APP, {WuxDOM, WUX} from "./micro-wux-app.js";

export function bootstrap(props) {
  return Promise.resolve().then(() => {
    // One-time initialization code goes here
    console.log('[' + props.name + '] bootstrap...');
  });
}
export function mount(props) {
  return Promise.resolve().then(() => {
    // Do framework UI rendering here
    console.log('[' + props.name + '] mount...');
    WuxDOM.render(new APP.Main(), 'single-spa-application:' + props.name);
  });
}
export function unmount(props) {
  return Promise.resolve().then(() => {
    // Do framework UI unrendering here
    console.log('[' + props.name + '] unmount...');
    WuxDOM.unmount('single-spa-application:' + props.name);
  });
}
export function unload(props) {
  return Promise.resolve().then(() => {
    // Hot-reloading implementation goes here
    console.log('[' + props.name + '] unload...');
  });
}
```

## The most minimal single-spa application

Start **minimal-spa-app**:

- `cd minimal-spa-app`
- `npm install`
- `npm start` - to serve single-spa applications at http://localhost:8080/index.js

Here is the **public/index.js**:

```javascript
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
```

## SVG Logo

```xml
<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 82 72" xmlns="http://www.w3.org/2000/svg">
  <text style="fill: rgb(0, 0, 0); font-family: Consolas; font-size: 50px;" x="0" y="40">{&#x00B5;}</text>
  <text style="fill: rgb(0, 0, 0); font-family: Consolas; font-size: 14px;" x="7" y="65">micro-wux</text>
</svg>
```

<table>
  <tr>
    <td><img src="micro-wux-black.svg" width="300" height="300"></td>
    <td><img src="micro-wux-white.svg" width="300" height="300"></td>
  </tr>
</table>

## License

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Contributors

* [Giorgio Silvestris](https://github.com/giosil)
