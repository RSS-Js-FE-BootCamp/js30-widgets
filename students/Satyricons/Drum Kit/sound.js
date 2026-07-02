
        document.getElementById('kik').addEventListener('click', function () { play("kik") })
        document.getElementById('hat').addEventListener('click', function () { play("hat") })
        function play(instrument) {
            console.log(instrument)
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            // Загружаем MP3-файл
            fetch(`./sound/${instrument}.mp3`)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
                .then(audioBuffer => {
                    const source = audioCtx.createBufferSource();
                    source.buffer = audioBuffer;
                    // подключение к динамикам
                    source.connect(audioCtx.destination);
                    // воспроизведение
                    source.start();
                })
                .catch(e => console.error('Ошибка загрузки или воспроизведения:', e));
        }
