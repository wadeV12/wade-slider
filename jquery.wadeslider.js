(function($) {
    'use strict';

    var defaults = {
        slidesToShow: 1,
        autoplay: true,
        interval: 3000,
        speed: 1000,
        arrows: true,
        arrowPrev: '<button class="wade-slider__arrow wade-slider__arrow--left"></button>',
        arrowNext: '<button class="wade-slider__arrow wade-slider__arrow--right"></button>',
        loop: true,
        responsive: true,
        transition: 'ease'
    };

    $.fn.wadeSlider = function(options) {

        var data = {},

            _this = this;

        //Slider elements
        var $slider = $(_this),
            $sliderOuter =  $slider.find('.wade-slider__outer'),
            $sliderItem = $slider.find('.wade-slider__item');

        if (data.intialized == true) {return;}


        //Private methods

        var init = function () {

            data.settings = $.extend({}, defaults, options);

            //if we want to show more slides then there are slides exist
            if (data.settings.slidesToShow > $sliderItem.length) {
                data.settings.slidesToShow = $sliderItem.length;
            }

            //set slider position
            data.settings.sliderPos = 0;

            //calculate layout of slider
            doMath();

            //create arrows
            buildArrows();

            //add transition
            applyTransition();

            //make slider responsive
            if (data.settings.responsive) {
                $(window).on('resize', doMath());
            }

            //run autoplay if it enabled
            autoplay();

            //set init slider flag
            data.intialized = true;

            if (data.intialized) {
                $slider.addClass('wade-initialized');
            }
        };

        /**
         * Calculate slider size
         */
        var doMath = function () {
            var slideIndex = 0;

            data.settings.slideWidth = Math.ceil($slider.width() / data.settings.slidesToShow);
            data.settings.sliderOuterWidth = Math.ceil(data.settings.slideWidth * $sliderItem.length);

            $sliderItem.each(function() {
               $(this)
                   .attr('data-index', slideIndex)
                   .css({
                       width: data.settings.slideWidth
                   });

               slideIndex++;
            });

            $sliderOuter.css({
                width: data.settings.sliderOuterWidth,
                transform: 'translate3d(0, 0, 0)'
            })
        };

        /**
         * Prepand arrows to slider
         */
        var buildArrows = function() {
            if (data.settings.arrows) {
                $(data.settings.arrowPrev).prependTo($slider);
                $(data.settings.arrowNext).appendTo($slider);

                //bind events to arrows
                $(document).on('click', '.wade-slider__arrow--left', function() {
                    _this.slideBefore();
                });

                $(document).on('click', '.wade-slider__arrow--right', function() {
                    _this.slideNext();
                });
            }
        };

        /**
         * Move slider in some direction.
         * @param direction {string} 'left', 'right'  - direction of slide movement
         */
        var moveSlider = function(direction) {

            data.isAnimateAvavible = false;

            data.settings.prevPos = data.settings.sliderPos;
            data.settings.sliderPos += direction == 'left' ? data.settings.slideWidth : -data.settings.slideWidth;

            if (data.settings.sliderPos > 0 || data.settings.sliderPos <= -(data.settings.sliderOuterWidth / data.settings.slidesToShow)) {
                data.settings.sliderPos = data.settings.prevPos;
            }

            $sliderOuter.css({
                transform: 'translate3d('+ data.settings.sliderPos + 'px, 0, 0)'
            })
        };

        /**
         * Run autoplay if it enabled
         */
        var autoplay = function() {
            if (data.settings.autoplay) {
                _this.startAutoplay();
            }
        };

        /**
         * Applying transitions for slider
         */
        var applyTransition = function() {
            $sliderOuter
                .css({
                    transition: 'transform ' + data.settings.speed + 'ms ' + data.settings.transition
                })
                .on('transitionend', function() {
                    data.isAnimateAvavible = true;
                });
        };

        //Public methods

        /**
         * Move slider to next slide
         */
        _this.slideNext = function() {
            moveSlider('right');
        };

        /**
         * Move slider to previous slide
         */
        _this.slideBefore = function() {
            moveSlider('left');
        };

        /**
         * Slider start autoplay function
         */
        _this.startAutoplay = function() {

            data.settings.autoplay = true;

            data.autoplay = setTimeout(function play() {
                if (data.isAnimateAvavible) {
                    moveSlider('right');
                    data.autoplay = setTimeout(play, data.settings.interval);
                }
                else {
                    clearTimeout(data.autoplay);
                    data.autoplay = setTimeout(play, data.settings.interval);
                }
            }, data.settings.interval)
        };

        /**
         * Slider stop autoplay function
         */
        _this.stopAutoplay = function() {
            if (!data.settings.autoplay) {return; }
            clearTimeout(data.autoplay);
        };

        //Init my best slider EU
        init();

        // returns the current jQuery object
        return this;
    };
})(jQuery);