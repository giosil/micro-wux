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
