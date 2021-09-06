$(function(){
    $('.select').each(function() {
        const _this = $(this),
            selectOption = _this.find('option'),
            selectOptionLength = selectOption.length,
            selectedOption = selectOption.filter(':selected'),
            duration = 450; // длительность анимации

        _this.hide();
        _this.wrap('<div class="select"></div>');
        $('<div>', {
            class: 'new-select',
            text: _this.children('option:disabled').text()
        }).insertAfter(_this);

        const selectHead = _this.next('.new-select');
        $('<div>', {
            class: 'new-select__list'
        }).insertAfter(selectHead);

        const selectList = selectHead.next('.new-select__list');
        for (let i = 1; i < selectOptionLength; i++) {
            $('<div>', {
                class: 'new-select__item',
                html: $('<span>', {
                    text: selectOption.eq(i).text()
                })
            })
                .attr('data-value', selectOption.eq(i).val())
                .appendTo(selectList);
        }

        const selectItem = selectList.find('.new-select__item');
        selectList.slideUp(0);
        selectHead.on('click', function() {
            if ( !$(this).hasClass('on') ) {
                $(this).addClass('on');
                selectList.slideDown(300);

                selectItem.on('click', function() {
                    let chooseItem = $(this).data('value');

                    $('select').val(chooseItem).attr('selected', 'selected');
                    selectHead.text( $(this).find('span').text() );

                    selectList.slideUp(duration);
                    selectHead.removeClass('on');
                });

            } else {
                $(this).removeClass('on');
                selectList.slideUp(300);
            }
        });
    });
    $('.faq .item .ask').on('click', function(){
        $(this).toggleClass('open').siblings('.answer').slideToggle()
    })
    $('.menu-btn').on('click', function(){
        $('.mob-menu').slideToggle().css('display','flex')
        $('body').addClass('fixed')
    })
    $('.close-btn').on('click', function(){
        $('.mob-menu').slideToggle().css('display','none')
        $('body').removeClass('fixed')
    })
    $(".carousel-big .carousel-inner").owlCarousel({
        items: 1,
        nav: true
    });
    $(".carousel-small .carousel-inner").owlCarousel({
        items: 5,
        nav: false,
        margin: 10,
        responsive: {
            1200: {
                items: 5
            },
            0: {
                items: 3
            }
        }
    });

    var sync1 = $('.carousel-big .carousel-inner'),
        sync2 = $('.carousel-small .carousel-inner'),
        duration = 300,
        thumbs = 4;

// Sync nav
    sync1.on('click', '.owl-next', function () {
        sync2.trigger('next.owl.carousel')
    });
    sync1.on('click', '.owl-prev', function () {
        sync2.trigger('prev.owl.carousel')
    });

// Start Carousel
    sync1.owlCarousel({
        rtl: true,
        center : true,
        loop: true,
        items : 1,
        margin:0,
        nav : true
    })
        .on('dragged.owl.carousel', function (e) {
            if (e.relatedTarget.state.direction == 'left') {
                sync2.trigger('next.owl.carousel')
            } else {
                sync2.trigger('prev.owl.carousel')
            }
        });


    sync2.owlCarousel({
        rtl: true,
        center: true,
        loop: true,
        items : thumbs,
        margin:10,
        nav : false
    })
        .on('click', '.owl-item', function() {
            var i = $(this).index()-(thumbs+1);
            sync2.trigger('to.owl.carousel', [i, duration, true]);
            sync1.trigger('to.owl.carousel', [i, duration, true]);
        });
    $('.slider').on('initialized.owl.carousel changed.owl.carousel', function(e) {
        if (!e.namespace)  {
            return;
        }
        var carousel = e.relatedTarget;
        $('.slider-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
    }).owlCarousel({
        items: 1,
        loop:true,
        margin:0,
        nav:true
    });

    $('.carousel-big .carousel-inner').on('initialized.owl.carousel changed.owl.carousel', function(e) {
        if (!e.namespace)  {
            return;
        }
        var carousel = e.relatedTarget;
        $('.count').text(carousel.relative(carousel.current()) + 1 + ' / ' + carousel.items().length);
    }).owlCarousel({
        items: 1,
        loop:true,
        margin:0,
        nav:true
    });
})