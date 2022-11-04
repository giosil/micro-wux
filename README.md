# micro-WUX - Wrapped User Experience 

A compact version of [WUX](https://github.com/giosil/wux) Javascript library to build component based user interface without dependencies.
micro-WUX was designed for the development of microfrontends.
In this project framework single-spa is used for bringing together multiple JavaScript microfrontends in a frontend application.
There are three subfolders:

- `micro-wux-app`   - typescript application with micro-wux library
- `single-spa-app`  - single-spa application
- `single-spa-root` - single-spa root config

## Build micro-WUX

- `git clone https://github.com/giosil/micro-wux.git`
- `npm install typescript -g`
- `tsc --declaration --project ./micro-wux-app/ts/wux/tsconfig.json`

## Build and deploy micro-wux App as microfrontend single-spa

- `cd micro-wux-app`
- `.\build.cmd`  - compile micro-wux application
- `.\deploy.cmd` - generate index.js copied in micro-wux-app/src folder

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

    export class HelloWorld extends WUX.WComponent {
        protected render() {
            return '<div>Hello World.</div>';
        }
    }

}

```

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
        WuxDOM.render(new APP.HelloWorld(), 'view-root');
    </script>
  </body>
</html>
```

## Contributors

* [Giorgio Silvestris](https://github.com/giosil)
