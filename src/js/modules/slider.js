import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade, Autoplay, FreeMode } from 'swiper/modules';
var sliders = {
    selector: ".js-slider",
    selectorVideo: ".js-slider-video",

    video: $('.js-video-slider')[0],
    autoPlay: '',

    swiper: '',
    swiperVideo: '',
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
        current.modules.push(Navigation, Pagination, EffectFade, Autoplay, FreeMode) // Добавляем Модули

        if ($(selector).hasClass('js-video-autoplay')) {
            sliders.swiperVideo = new Swiper($(selector)[0], current)

            sliders.swiperVideo.autoplay.stop()
            sliders.swiperVideo.on('slideChange', function (e) {
                if (e.activeIndex === 0) {
                    sliders.swiperVideo.autoplay.stop()
                } else {
                    sliders.swiperVideo.autoplay.start()
                }
                sliders.video.play();
            });
        } else {
            sliders.swiper = new Swiper($(selector)[0], current)
        }

        selector.addEventListener('touchstart', () => false, { passive: false })

    },

    playing: () => {
        setTimeout(function(){
            $('.js-video-slider')[0].play();
            sliders.swiperVideo.slideNext()
            sliders.swiperVideo.autoplay.start()
        }, 1);
    },

    run: (selector) => {
        sliders.build(selector);
    },

    init: () => {
        if (!$(sliders.selector).length) return false;

        if ($('.js-video-slider')[0]) {
            $('.js-video-slider')[0].addEventListener("ended", sliders.playing, false);
        }

        $(window).on("load", (e) => {
            $(sliders.selector).each((i, el) => {
                sliders.run(el);
            });

            $(sliders.selectorVideo).each((i, el) => {
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
                $(sliders.selectorVideo).each((i, el) => {
                    sliders.run(el);
                });
            }, 100);
        });
    },
};

export { sliders };