# micro-WUX - Wrapped User Experience 

A compact version of [WUX](https://github.com/giosil/wux) Javascript library to build component based user interface without dependencies.

Here is also an example of Javascript microfrontend using [single-spa](https://single-spa.js.org/) framework and micro-wux library:

- `micro-wux-app`   - typescript application with micro-wux library
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
- `.\deploy.cmd` or `./deploy.sh` - generate index.js in micro-wux-app/src folder

## Build and deploy micro-wux App as microfrontend single-spa with npm

- `cd micro-wux-app`
- `npm run build`  - compile micro-wux application
- `npm run deploy` - generate index.js in micro-wux-app/src folder
- `npm link` - link this package
- `cd ..\single-spa-app`
- `npm link micro-wux-app` - link `micro-wux-app` in `single-spa-app`

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

## Single-spa application using single-spa-html

```javascript
import singleSpaHtml from "single-spa-html";

// Uncomment if "micro-wux-app" are linked with npm.
// import APP, {WuxDOM, WUX} from "micro-wux-app";

const htmlLifecycles = singleSpaHtml({
  template: '<div id="view-root"></div>'
});
export const bootstrap = htmlLifecycles.bootstrap;
export const mount = async (props) => {
  await htmlLifecycles.mount(props);
  WuxDOM.render(new APP.Main(), 'view-root');
};
export const unmount = async (props) => {
  await htmlLifecycles.unmount(props);
  WuxDOM.unmount('view-root');
};

/* micro-wux app */
/* Code appended by micro-wux-app/deploy[.cmd|.sh] */
/* Empty, if imported from "micro-wux-app" */
```

## Contributors

* [Giorgio Silvestris](https://github.com/giosil)
