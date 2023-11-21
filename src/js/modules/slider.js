import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/effect-fade-element';
var sliders = {
    selector: ".js-slider",

    video: $('.js-video-slider')[0],
    autoPlay: '',

    swiper: '',
    settings: {
        modules: [],
        pagination: {
            clickable: true
        },
    },

    build: (selector) => {
        let data = $(selector).attr("data-settings")
            ? $(selector).data("settings")
            : {};

        let clone = JSON.parse(JSON.stringify(sliders.settings));

        let current = Object.assign(clone, data);
        current.modules.push(Navigation, Pagination, EffectFade, Autoplay) // Добавляем Модули

        sliders.swiper = new Swiper($(selector)[0], current)

        if ($(selector).hasClass('js-video-autoplay')) {
            sliders.swiper.autoplay.stop()
            sliders.swiper.on('slideChange', function (e) {
                if (e.activeIndex === 0) {
                    sliders.swiper.autoplay.stop()
                } else {
                    sliders.swiper.autoplay.start()
                }
                sliders.video.play();
            });
        }

        selector.addEventListener('touchstart', () => false, { passive: false })

    },

    playing: () => {
        setTimeout(function(){
            $('.js-video-slider')[0].play();
            sliders.swiper.slideNext()
            sliders.swiper.autoplay.start()
            console.log('playing')
        }, 1);
    },

    run: (selector) => {
        sliders.build(selector);
    },

    init: () => {
        if (!$(sliders.selector).length) return false;

        $('.js-video-slider')[0].addEventListener("ended", sliders.playing, false);

        $(window).on("load", (e) => {
            $(sliders.selector).each((i, el) => {
                sliders.run(el);
            });
        });

        $(window).bind('resize', function(e)
        {
            if (window.RT) clearTimeout(window.RT);
            window.RT = setTimeout(function()
            {
                $(sliders.selector).each((i, el) => {
                    sliders.run(el);
                });
            }, 100);
        });
    },
};

export { sliders };