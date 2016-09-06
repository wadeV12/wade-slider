# wade-slider

This is my first jQuery plugin and first slider :)

### Initialization

To init slider you have to:

```javascript

  $('.wade-slider').wadeslider({options});

```

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
autoplay | boolean | true | Enables slider autoplay
arrows | boolean | true | Enables slider arrows
arrowPrev | html | `<button class="wade-slider__arrow wade-slider__arrow--left"></button>` | Slider prev arrow
arrowNext | html | `<button class="wade-slider__arrow wade-slider__arrow--left"></button>` | Slider next arrow
loop | boolean | true | Loop slides
interval | integer | 5000 | Autoplay speed (ms)
slidesToShow | integer | 1 | Slides to display
speed | integer | 1000 | Slide animation speed (ms)
responsive | boolean | true | Responsive slider

### Methods

Method |  Description
------ | -----------
slideNext | Go to next slide
slideBefore | Go to previous slide

Example of usage

```javascript

  var slider = $('.wade-slider').wadeslider({options});
  
  $('button').on('click', function() {
    slider.slideNext();
  });

```
