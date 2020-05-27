$( document ).ready(function() {

    //Dropdown menu
    $('.burguer').click( function() {
        $('.dropdown').toggleClass("down");
        $(".header").toggleClass("sticky-header");
    });

    //Go up
    $('#subir').click( function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    //Go up
    $('#subir').click( function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    //reduce header size
    var h = $(".header").height();
    $("body").css("padding-top", h);

    $(window).scroll(function(){
        if ($(window).scrollTop() > 130) {
            $(".header").addClass("small-header");
             h = $(".header").height();
            $("body").css("padding-top", h);
        } else {
            $(".header").removeClass("small-header");
        }
    });
    
    $('.slick-carrousel').slick({
        'setting-name': 'setting-value',
        dots: true,
        arrows: true,
        autoplay: false,
        autoplaySpeed: 8000,
        appendArrows: $('.slick-container'),
        appendDots: $('.slick-container')
      });

    //ocultar y mostrar texto de contexto sociopolitico
    $('#mas-socio').click( function() {
        $('.corto').addClass('hide');
        $('.corto').removeClass('show');

        $('.largo').removeClass('hide');
        $('.largo').addClass('show');
    });

    $('#menos-socio').click( function() {
        $('.largo').addClass('hide');
        $('.largo').removeClass('show');

        $('.corto').removeClass('hide');
        $('.corto').addClass('show');
    }); 


    // dropdown-menu mobile
    if ($(window).width() < 600) {
        
        //entrar
        $('.nav-item').click( function() {
            $('.background').fadeIn(300);
            $('.background').addClass('clicked');
            $('html').css('overflow', 'hidden');
            
        });

        //salir
        $('.background, .dropdown-menu').click( function() {

            if ($('.background').hasClass('clicked')){

                $('.background').fadeOut(300);
                $('html').css('overflow', 'auto');
                $('.dropdown-menu').removeClass('show');
                $('.background').removeClass('clicked');
                
                return false;
            }
        }); 
    }

});