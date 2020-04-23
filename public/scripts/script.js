$( document ).ready(function() {
    console.log( "ready!" );

    //Dropdown menu
    $('.burguer').click( function() {
        $('.dropdown').toggleClass("down");
        $("body").toggleClass("disable-scroll");
    });

    //Go up
    $('#subir').click( function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    //Go up
    $('#subir').click( function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    $('.slick-carrousel').slick({
        'setting-name': 'setting-value',
        'dots': 'true'
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
});