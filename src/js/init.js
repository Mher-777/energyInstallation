import { defaults } from "./modules/defaults";
import { forms } from "./modules/forms";
import { button } from "./modules/button";
import { sliders } from "./modules/slider";
import { menu } from "./modules/menu";
import { config } from "./config";

var App = () => {};

App.prototype.init = () => {

	defaults.init();
	forms.init();
	button.init();
	sliders.init();
	menu.init()
	config.log('app init')
	
};

export { App };