import {config} from "../config";
var defaults = {

	events: () => {
		// config.body.css('paddingTop', config.header.outerHeight());
		//
		// let resizeTimer;
		// config.addListenerMulti(window, 'resize load', function () {
		// 	// document.body.classList.add("resize-animation-stopper");
		// 	const headerHeight = config.header.outerHeight();
		//
		// 	clearTimeout(resizeTimer);
		// 	resizeTimer = setTimeout(() => {
		// 		// document.body.classList.remove("resize-animation-stopper");
		// 		config.body.css('paddingTop', headerHeight)
		// 	}, 500);
		// })

		$('.js-scroll').on('click', function() {
			let target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.substr(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		});
	},

	init: () => {

		defaults.events();

	}
}

export { defaults }