
/*
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  Paralux - Responsive Startup Landing Page Template
––––––––––––––––––––––––––––––––––––––––––––––––––––––

    - File           : script.js
    - Desc           : Template - JavaScript
    - Version        : 1.1
    - Date           : 2017-03-26
    - Author         : EvenThemes
    - Author URI     : https://themeforest.net/user/eventhemes

––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
*/


(function($) {

    "use strict";

    var bodySelector = $("body"),
    htmlAndBody = $("html, body"),
    windowSelector = $(window);
    $.fn.hasAttr = function(attr) {  
       if (typeof attr !== typeof undefined && attr !== false && attr !== undefined) {
            return true;
       }
       return false;
    };

    var background_image = function() {
        $("[data-bg-img]").each(function() {
            var attr = $(this).attr('data-bg-img');
            if (typeof attr !== typeof undefined && attr !== false && attr !== "") {
                $(this).css('background-image', 'url('+attr+')');
            }
        });  
    };

    var preloader = function() {
        var pageLoader = $('#preloader');
        if(pageLoader.length) {
            pageLoader.children().fadeOut(); /* will first fade out the loading animation */
            pageLoader.delay(150).fadeOut('slow'); /* will fade out the white DIV that covers the website.*/
            bodySelector.delay(150).removeClass('preloader-active');
        }
    };

    var html_direction = function() {
        var html_tag = $("html"),
            dir = html_tag.attr("dir"),
            directions = ['ltr', 'rtl'];
        if (html_tag.hasAttr('dir') && jQuery.inArray(dir, directions)) {
            html_tag.addClass(dir);
        } else {
            html_tag.attr("dir", directions[0]).addClass(directions[0]);
        }
    };

    /* -------------------------------------
        BACK TO TOP
    ------------------------------------- */
    var back_to_top = function() {
        var backTop = $('#backTop');
        if (backTop.length) {
            var scrollTrigger = 200,
                scrollTop = windowSelector.scrollTop();
            if (scrollTop > scrollTrigger) {
                backTop.addClass('show');
            } else {
                backTop.removeClass('show');
            }
        }
    };
    
    var click_back = function() {
        var backTop = $('#backTop');
        backTop.on('click', function(e) {
            htmlAndBody.animate({
                scrollTop: 0
            }, 700);
            e.preventDefault();
        });
    };

    /* -------------------------------------
        SELECT BOX 
    ------------------------------------- */
    var custom_select = function() {
        var customSelect = $('.field > select');
        customSelect.each(function() {

            var select = $(this),
            self = select.parent(),
            placeholder = select.data('placeholder') ? select.data('placeholder') : ( select.find('option[selected]').text() ? select.find('option[selected]').text() : select.find('option:eq(0)').text()),
            selectClass = select.attr('class');

            self.append('<input class="'+ selectClass +' value-holder" type="text" disabled="disabled" readonly="readonly" placeholder="' + placeholder + '">');
            self.append('<ul class="select-clone"></ul>');

            var clone = self.find('.select-clone');
            select.find('option').each(function() {
                if ($(this).attr('value')) {
                    clone.append('<li data-value="' + $(this).val() + '">' + $(this).text() + '</li>');
                }
            });

            self.on('click', function() {
                clone.slideToggle(100);
                self.toggleClass('active');
            });

            var value_holder = self.find('.value-holder');
            clone.find('li').on('click', function() {
                value_holder.val($(this).text());
                select.find('option[value="' + $(this).attr('data-value') + '"]').attr('selected', 'selected');
                if (self.hasClass('links')) {
                    window.location.href = select.val();
                }
            });

            windowSelector.on('click', function() {
                clone.slideUp(100);
            });
            self.on('click', function(event) {
                event.stopPropagation();
            });

            if (self.hasClass('links')) {
                select.on('change', function() {
                    window.location.href = select.val();
                });
            }
        });

    };

    var datepicker = function() {
        $('.field-date > input').datepicker({
            format: 'mm-dd-yyyy'
        });
    };

    /*-------------------------------------
        MAGNIFIC POPUP
    -------------------------------------*/
    var magnific_popup = function() {
        $('.img-lightbox').magnificPopup({
            type: 'image',
            mainClass: 'mfp-fade',
            gallery: {
                enabled: true
            }
          
        });
        $('.iframe-lightbox').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false,
            iframe: {
              patterns: {
                youtube: {
                  src: 'https://www.youtube.com/embed/%id%?autoplay=1' /* URL that will be set as a source for iframe. */
                },
                vimeo: {
                  src: 'https://player.vimeo.com/video/%id%?autoplay=1'
                },
                gmaps: {
                  index: 'https://maps.google.'
                }
              }
            }
        });
    };

    /*--------------------
        Navbar JS
    ---------------------*/
    var navbar = function() {
        var navbarCollapse = $(".navbar-collapse"),
        navbarHeader = $(".navbar-header");
        windowSelector.on('resize', function() {
            navbarCollapse.css({ maxHeight: windowSelector.height() - navbarHeader.height() + "px" });
        }); 
        navbarCollapse.find('a.page-scroll').on('click', function() {
            $('.navbar-toggle:visible').click();
        });
        $('a.page-scroll').on('click', function(event) {
            var $anchor = $(this);
            htmlAndBody.stop().animate({
              scrollTop: $($anchor.attr('href')).offset().top - 80
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    };
    var scroll_spy = function() {
        bodySelector.scrollspy({
            target: '.navbar-default'
        });
    };
    
    /*-------------------------------------
     Carousel slider initiation
    -------------------------------------*/
    var owl_carousel = function() {
        $('.owl-carousel').each(function () {
            var carousel = $(this),
                autoplay_hover_pause = carousel.data('autoplay-hover-pause'),
                loop = carousel.data('loop'),
                items_general = carousel.data('items'),
                margin = carousel.data('margin'),
                autoplay = carousel.data('autoplay'),
                autoplayTimeout = carousel.data('autoplay-timeout'),
                smartSpeed = carousel.data('smart-speed'),
                nav_general = carousel.data('nav'),
                navSpeed = carousel.data('nav-speed'),
                xxs_items = carousel.data('xxs-items'),
                xxs_nav = carousel.data('xxs-nav'),
                xs_items = carousel.data('xs-items'),
                xs_nav = carousel.data('xs-nav'),
                sm_items = carousel.data('sm-items'),
                sm_nav = carousel.data('sm-nav'),
                md_items = carousel.data('md-items'),
                md_nav = carousel.data('md-nav'),
                lg_items = carousel.data('lg-items'),
                lg_nav = carousel.data('lg-nav'),
                center = carousel.data('center'),
                dots_global = carousel.data('dots'),
                xxs_dots = carousel.data('xxs-dots'),
                xs_dots = carousel.data('xs-dots'),
                sm_dots = carousel.data('sm-dots'),
                md_dots = carousel.data('md-dots'),
                lg_dots = carousel.data('lg-dots');

            carousel.owlCarousel({
                autoplayHoverPause: autoplay_hover_pause,
                loop: (loop ? loop : false),
                items: (items_general ? items_general : 1),
                lazyLoad: true,
                margin: (margin ? margin : 0),
                autoplay: (autoplay ? autoplay : false),
                autoplayTimeout: (autoplayTimeout ? autoplayTimeout : 1000),
                smartSpeed: (smartSpeed ? smartSpeed : 250),
                dots: (dots_global ? dots_global : false),
                nav: (nav_general ? nav_general : false),
                navText: ["<i class='fa fa-angle-left' aria-hidden='true'></i>", "<i class='fa fa-angle-right' aria-hidden='true'></i>"],
                navSpeed: (navSpeed ? navSpeed : false),
                center: (center ? center : false),
                responsiveClass: true,
                responsive: {
                    0: {
                        items: ( xxs_items ? xxs_items : (items_general ? items_general : 1)),
                        nav: ( xxs_nav ? xxs_nav : (nav_general ? nav_general : false)),
                        dots: ( xxs_dots ? xxs_dots : (dots_global ? dots_global : false))
                    },
                    480: {
                        items: ( xs_items ? xs_items : (items_general ? items_general : 1)),
                        nav: ( xs_nav ? xs_nav : (nav_general ? nav_general : false)),
                        dots: ( xs_dots ? xs_dots : (dots_global ? dots_global : false))
                    },
                    768: {
                        items: ( sm_items ? sm_items : (items_general ? items_general : 1)),
                        nav: ( sm_nav ? sm_nav : (nav_general ? nav_general : false)),
                        dots: ( sm_dots ? sm_dots : (dots_global ? dots_global : false))
                    },
                    992: {
                        items: ( md_items ? md_items : (items_general ? items_general : 1)),
                        nav: ( md_nav ? md_nav : (nav_general ? nav_general : false)),
                        dots: ( md_dots ? md_dots : (dots_global ? dots_global : false))
                    },
                    1199: {
                        items: ( lg_items ? lg_items : (items_general ? items_general : 1)),
                        nav: ( lg_nav ? lg_nav : (nav_general ? nav_general : false)),
                        dots: ( lg_dots ? lg_dots : (dots_global ? dots_global : false))
                    }
                }
            });

        });
    };

    var vegasSlider = function(){
        $(".hero-images-slider").vegas({
            slides: [
                { src: "assets/images/slider/slide2.jpg" },
                { src: "assets/images/slider/slide3.jpg" },
                { src: "assets/images/slider/slide4.jpg" },
                { src: "assets/images/slider/slide5.jpg" }
            ],
            timer: false
        });
    };


    var YTPlayer = function() {
        $("#header_video").YTPlayer({
            showControls: false
        });
    };

    /* =======================================
       When document is ready, do
    ======================================= */
       
        $(document).on('ready', function() {
            preloader();
            html_direction();
            background_image();
            custom_select();
            click_back();
            magnific_popup();
            navbar();
            scroll_spy();
            owl_carousel();
            datepicker();
            vegasSlider();
            YTPlayer();
        });
        
    /* ======================================
       When document is loading, do
    ====================================== */
        
        windowSelector.on('load', function() {
            preloader();
        });

    /* ======================================
       When document is Scrollig, do
    ======================================= */
        windowSelector.on('scroll', function() {
            back_to_top();
        });

    // Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("quote_submit");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Get the modal
var modal = document.getElementById('myModal-1');

// Get the button that opens the modal
var btn = document.getElementById("conntact_submit");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
})(jQuery);