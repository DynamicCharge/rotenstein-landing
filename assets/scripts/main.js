$(document).ready(function() {

    if($('.expectations__slide').length>1) {
        $('.expectations__slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            fade: true,
            cssEase: 'linear',


            prevArrow: '.expectations__slider-prev',
            nextArrow: '.expectations__slider-next',
            dots: true,
        });
    }

    if($('.working__slider__slide').length>1) {

        var $slider = $('.working__slider');

        if ($slider.length) {
        var currentSlide;
        var slidesCount;
        // var sliderCounter = document.createElement('div');
        // sliderCounter.classList.add('slider__counter');
        
        var updateSliderCounter = function(slick, currentIndex) {
            currentSlide = slick.slickCurrentSlide() + 1;
            slidesCount = slick.slideCount;
            $('.slider-counter').text(currentSlide + ' / ' +slidesCount)
        };

        $slider.on('init', function(event, slick) {
            updateSliderCounter(slick);
        });

        $slider.on('afterChange', function(event, slick, currentSlide) {
            updateSliderCounter(slick, currentSlide);
        });

        $slider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            fade: true,
            cssEase: 'linear',


            prevArrow: '.working__slider-prev',
            nextArrow: '.working__slider-next',

            responsive: [
                {
                    breakpoint: 769,
                    settings: {
                      dots: true
                    }                    
                }
            ],
        });
        }
    }

    $('.portfolio__slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,

        prevArrow: '.portfolio__slider-prev',
        nextArrow: '.portfolio__slider-next',

        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }                    
            }
        ],
    });

    $('[data-tabs]').on('click', function(){
        var content = $(this).attr('data-tabs');
        console.log(content);

        $(this).parents('.compound__wrapper__wrap').find('[data-tabs]').removeClass('_active')
        $(this).parents('.compound__wrapper__wrap').find('[data-tabs-content]').removeClass('_active');
        $(this).parents('.compound__wrapper__wrap').find('[data-tabs-content]').fadeOut(1);

        $(this).addClass('_active');
        $(this).parents('.compound__wrapper__wrap').find('[data-tabs-content]').each(function(){
            if($(this).attr('data-tabs-content') == content) {
                $(this).addClass('_active');
                $(this).fadeIn(600);
            }
        });
    });

    $('.ac-trigger').on('click', function(){
        if(!$(this).parent('li').find('.ac-list').hasClass('_active')){
            $('.ac-trigger').removeClass('_active');
            $(this).addClass('_active');
            $('.ac-list').slideUp(200);
            $('.ac-list').removeClass('_active');
            $(this).parent('li').find('.ac-list').addClass('_active')
                                    .slideDown(400);
        } else {
            $(this).removeClass('_active');
            $(this).parent('li').find('.ac-title').removeClass('_active');
            $(this).parent('li').find('.ac-list').removeClass('_active')
                                    .slideUp(200);
        }
    });

    $('[data-type=name]').on('input', function(){
        this.value = this.value.replace(/[^a-zа-яё\s]/gi, '');
    });
    $('[data-type=phone]').mask("+7 (999) 999-99-99");

    $('[data-page-form]').on('submit', function(){
        var $this = $(this); 
        var formData = {};

        if($this.find('[data-type=name]').length>0) {
            var dataName = $this.find('[data-type=name]').val();
            if (!dataName == '' || !dataName == ' ') {
                formData['name'] = dataName;
            }
        }
        if($this.find('[data-type=phone]').length>0) {
            var dataPhone = $this.find('[data-type=phone]').val();
            if (dataPhone == '' || dataPhone == ' ') {
                $this.find('[data-type=phone]').addClass('_error');
                $this.find('.error-text').show();
            } else {
                $this.find('[data-type=phone]').removeClass('_error');
                $this.find('.error-text').hide();
                formData['phone'] = dataPhone;
            }
        }
        if($this.find('[data-type=email]').length>0) {
            var pattern = /^[a-z0-9._-]+@[a-z0-9-]+\.[a-z]{2,6}$/i;
            var dataMail = $this.find('[data-type=email]').val();
            if (dataMail == '' || dataMail == ' ' || $this.find('[data-type=email]').val().search(pattern) != 0) {

            } else {
                formData['email'] = dataMail;
            }
        }
        if($this.find('[data-type=comment]').length>0) {
            var dataComment = $this.find('[data-type=comment]').val();
            formData['comment'] = dataComment;
        }

        if($this.find('[data-type]').hasClass('_error')) {
                return false;
        }
        console.log(formData);
        return false;

    });

    ymaps.ready(init);
    function init(){
        // Создание карты.
        var myMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [55.759375, 37.666045],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 17
        });

        var myPlacemark = new ymaps.Placemark([55.759375, 37.666045], {
            hintContent: 'Нижний сусальный переулок',
          });
          myMap.geoObjects.add(myPlacemark);

        myMap.controls.remove('searchControl');
        // myMap.controls.remove('zoomControl');
        myMap.behaviors.disable('scrollZoom');
    }

});