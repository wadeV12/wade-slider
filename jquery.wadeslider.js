(function($) {
    'use strict';

    var defaults = {
        slidesToShow: 2,
        autoplay: true,
        arrows: true
    };

    $.fn.wadeSlider = function(options) {

        var data = {},

            _this = this;

        var $slider = $(_this);
        var $sliderOuter =  $slider.find('.wade-slider__outer');
        var $sliderItem = $slider.find('.wade-slider__item');

        //Private methods

        var init = function () {

            data.settings = $.extend({}, defaults, options);

            //if we want to show more slides then there are slides exist
            if (data.settings.slidesToShow > $sliderItem.length) {
                data.settings.slidesToShow = $sliderItem.length;
            }

            doMath();

            if (!$slider.hasClass('wade-initialized')) {
                $slider.addClass('wade-initialized');
            }
        };

        var doMath = function () {
            data.settings.slideWidth = $slider.width() / data.settings.slidesToShow;
            data.settings.sliderOuterWidth = data.settings.slideWidth * $sliderItem.length;

            $sliderItem.each(function() {
               $(this).css({
                   width: data.settings.slideWidth
               })
            });

            $sliderOuter.css({
                width: data.settings.sliderOuterWidth,
                transform: 'translate3d(0, 0, 0)'
            })
        };


        //Public methods

        _this.slideNext = function() {
            $sliderOuter.css({
                transform: 'translate3d('+ -data.settings.slideWidth + 'px, 0, 0)'
            });
        };


        //Init my best slider EU
        init();



        // returns the current jQuery object
        return this;
    };
})(jQuery);
