
var config = {

	debug: true,

	animationEnd: "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",

	transitionEnd: "transitionend webkitTransitionEnd oTransitionEnd",

	body: $('body'),

	html: $('html'),

	header: $('header'),

	getRandomInt: (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	log: (...args) => {

		if(!config.debug)
			return false;

		console.log(...args);

	},

	URLToArray: url => {

	    var request = {};
	    var pairs = url.substring(url.indexOf('?') + 1).split('&');
	    for (var i = 0; i < pairs.length; i++) {
	        if(!pairs[i])
	            continue;
	        var pair = pairs[i].split('=');
	        request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
	     }
	    return request;
	},

	ArrayToURL: array => {
		var pairs = [];
		for (var key in array)
			if (array.hasOwnProperty(key))
				pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(array[key]));

		return pairs.join('&');
	},

	numberWithSpaces: x => {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	},

	delay : (fn, ms) => {
	    let timer = 0
	    return function(...args) {
	        clearTimeout(timer)
	        timer = setTimeout(fn.bind(this, ...args), ms || 0)
	    }
	},

	guidGenerator: () => {
	    var S4 = function() {
	       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	    };
	    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());		
	},

	addListenerMulti: (element, eventNames, listener) => {
		const events = eventNames.split(' ');
		for (let i = 0, iLen = events.length; i < iLen; i++) {
			element.addEventListener(events[i], listener, false);
		}
	},

	scrollbarWidth: () => {
		let documentWidth = parseInt(document.documentElement.clientWidth);
		let windowsWidth = parseInt(window.innerWidth);
		let scrollbarWidth = windowsWidth - documentWidth;
		return scrollbarWidth;
	}
};

export { config };

