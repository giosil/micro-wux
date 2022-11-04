# micro-WUX - Wrapped User Experience 

A compact version of [WUX](https://github.com/giosil/wux) Javascript library to build component based user interface without dependencies.

Here is also an example of Javascript microfrontend using [single-spa](https://single-spa.js.org/) framework and micro-wux library:

- `micro-wux-app`   - typescript application with micro-wux library
- `single-spa-app`  - single-spa application
- `single-spa-root` - single-spa root config

## Build micro-WUX

- `git clone https://github.com/giosil/micro-wux.git`
- `npm install typescript -g`
- `tsc --declaration --project ./micro-wux-app/ts/wux/tsconfig.json`

## Build and deploy micro-wux App as microfrontend single-spa

- `cd micro-wux-app`
- `.\build.cmd`  or `./build.sh`  - compile micro-wux application
- `.\deploy.cmd` or `./deploy.sh` - generate index.js in micro-wux-app/src folder

## Run 

- `cd single-spa-app`
- `npm install`
- `npm start` - to serve single-spa applications at http://localhost:8080/index.js

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
<!doctype html>
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
...
```
## Contributors

* [Giorgio Silvestris](https://github.com/giosil)
