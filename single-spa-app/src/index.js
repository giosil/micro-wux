import singleSpaHtml from "single-spa-html";

import APP, {WuxDOM, WUX} from "./micro-wux-app.js";

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