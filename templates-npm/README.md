# micro-WUX - NPM Templates

Templates to build the application by defining npm packages.

## micro-wux module-type package

The project was created with the following command:

- `cd micro-wux`
- `npm init -y`
- `npm install typescript --save-dev`
- `npm install @types/jquery --save-dev`
- `npm install @types/bootstrap --save-dev`

Edit `package.json`:

```json
{
  ...
  "main": "dist/index.js",
  "files": [
    "dist/**/*"
  ],
  "type": "module",
  "types": "dist/*.d.ts",
  "scripts": {
    "build": "tsc",
    "postbuild": "node ./src/post_build.js",
  },
  ...
}
```

Edit `tsconfig.json` create by `tsc --init`:

```json
{
  ...
  "module": "none",
  "moduleResolution": "node",
  "outDir": "dist",
  "outFile": "dist/index.js",
  "types": ["jquery","bootstrap"]
  ...
}
```

Build:

- `npm run build`

Link:

- `npm link`

## micro-app module-type package

The project was created with the following command:

- `cd micro-app`
- `npm init -y`
- `npm install typescript --save-dev`
- `npm install @types/jquery --save-dev`
- `npm install @types/bootstrap --save-dev`

Add `micro-wux` dependency:

- `npm link micro-wux --save`

Edit `package.json`:

```json
{
  ...
  "main": "dist/index.js",
  "files": [
    "dist/**/*"
  ],
  "type": "module",
  "types": "dist/*.d.ts",
  "scripts": {
    "build": "tsc",
    "postbuild": "node ./src/post_build.js",
  },
  ...
}
```

Edit `tsconfig.json` create by `tsc --init`:

```json
{
  ...
  "module": "none",
  "moduleResolution": "node",
  "outDir": "dist",
  "outFile": "dist/index.js",
  "types": ["jquery","bootstrap"]
  ...
}
```

Build:

- `npm run build`

Link:

- `npm link`

## single-spa-app

Add `micro-wux` and `micro-app` dependencies:

- `cd ../single-spa-app`
- `npm link micro-wux --save`
- `npm link micro-app --save`

Edit `src/index.js`

```javascript
import singleSpaHtml from "single-spa-html";

import {WuxDOM, WUX} from "micro-wux";

import APP from "micro-app";

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
```

## Contributors

* [Giorgio Silvestris](https://github.com/giosil)
