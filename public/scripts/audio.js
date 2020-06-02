(function ($, root, undefined) {

    var $botPlay = $('#playAudio');
    var audio = document.getElementById("audio");

    $botPlay.click(playPauseAudio);


    // función para hacer toggle a reproducir/pausar audio
    function playPauseAudio() {
        var playing = $botPlay.hasClass('playing') ? true : false;
        
        if (!playing) {
        playAudio();
        } else {
        pauseAudio();
        }
    }

    //función para reproducir la pista de audio
    function playAudio() {
        $botPlay.removeClass('playing').removeClass('paused');
        $botPlay.addClass('playing');
        $botPlay.html("Pausar relato");
        audio.play();
    }

    //función para pausar la pista de audio
    function pauseAudio() {
      $botPlay.removeClass('playing').removeClass('paused');
      $botPlay.addClass('paused');
      $botPlay.html("Escuchar relato");
      audio.pause();
    }

})(jQuery, this);
