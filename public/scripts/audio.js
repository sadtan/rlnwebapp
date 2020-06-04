(function ($, root, undefined) {

    var $botPlay = $('#playAudio');
    var audio = document.getElementById("audio");
    var $reproductor = $('#reproductor');
    var $text = $('#txt-escuchar');
    var $timeSelect = $('#time-select');

    $botPlay.click(playPauseAudio);

    //función para hacer toggle a reproducir/pausar audio
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
        audio.play();
        $text.hide();
        $reproductor.show();
        
        audio.ontimeupdate = () => {
            var timeCurrent = audio.currentTime;
            var timeTotal = audio.duration;
            
            updateTimeText(timeCurrent, timeTotal);
        }
    }

    //función para pausar la pista de audio
    function pauseAudio() {
      $botPlay.removeClass('playing').removeClass('paused');
      $botPlay.addClass('paused');
      audio.pause();
    }

    //Función para actualizar texto de tiempo
    function updateTimeText(current, total) {
        var porcentaje = ((current * 100)/total);
        $('.reproductor .current').attr('style', 'width: '+porcentaje+'%');
        $('.reproductor .select').attr('style', 'left: '+porcentaje+'%');
        $('.reproductor .time').html(secondsTimeSpanToHMS(current) + '/' + secondsTimeSpanToHMS(total));
    }

    //Función para convertir el tiempo a formato minutos y segundos
    function secondsTimeSpanToHMS(s) {
        var h = Math.floor(s/3600);
        s -= h*3600;
        var m = Math.floor(s/60);
        s -= m*60;
        s = Math.floor(s)
        return (m)+":"+(s < 10 ? '0'+ s : s);
    }


    $('#reproductor .slider').click(updateProgressBar);
    $('#reproductor .slider').click(updateProgressBar);

    function updateProgressBar(event) {
        
        var $total = $('#reproductor .total');
        var totalWidth = Math.floor($total.width());
        var offsetLeft = $total.offset().left;
        var x = Math.floor(event.pageX - offsetLeft);
        var timeTotal = audio.duration;
        var percentage =  (100 / totalWidth) * x;
        var newTime = (percentage * timeTotal) / 100

        audio.currentTime = newTime;
    }

})(jQuery, this);
