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
});