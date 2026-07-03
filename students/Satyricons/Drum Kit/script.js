//Вешаем событие на клик
document.addEventListener('click', function (event) {

    //Автобит:
    if (event.target.id === 'bit') {
        function bit(sound) {
            AudioManager.play(sound)
        }
        setInterval(bit, 1000, event.target.parentElement.children[0].id);
        return
    }

    //Обработка кликов
    if (event.target.id === 'stop') AudioManager.stopAll()
    //чтоб играло и по клику буквы или пиано
    if (event.target.id === '') AudioManager.play(event.target.parentElement.id)
    if (!(event.target.id === 'select_sint' || event.target.id === 'select_clap' || event.target.id === 'select_hat' || event.target.id === 'select_kik' || event.target.id === 'select_openhat' || event.target.id === 'select_boom' || event.target.id === 'select_ride' || event.target.id === 'select_snare' || event.target.id === 'select_tom' || event.target.id === 'select_tink')) AudioManager.play(event.target.id)
});

//Вешаем событие на нажатие клавиши
document.addEventListener('keydown', function (event) {
    if (event.repeat) return // Просто игнорируем это событие

    if (event.keyCode === 65) AudioManager.play(document.getElementById('select_clap').value)
    if (event.keyCode === 83) AudioManager.play(document.getElementById('select_hat').value)
    if (event.keyCode === 68) AudioManager.play(document.getElementById('select_kik').value)
    if (event.keyCode === 70) AudioManager.play(document.getElementById('select_openhat').value)
    if (event.keyCode === 71) AudioManager.play(document.getElementById('select_boom').value)
    if (event.keyCode === 72) AudioManager.play(document.getElementById('select_ride').value)
    if (event.keyCode === 74) AudioManager.play(document.getElementById('select_snare').value)
    if (event.keyCode === 75) AudioManager.play(document.getElementById('select_tom').value)
    if (event.keyCode === 76) AudioManager.play(document.getElementById('select_tink').value)
});

//Обрабатываем конец анимации
document.addEventListener('transitionend', (event) => {
    event.target.setAttribute('class', 'inactive');
});

//Обрабатываем изменение select    
document.addEventListener('input', function (event) {
    document.getElementById(event.target.parentElement.id).setAttribute('id', event.target.value)
 if (event.target.id==='select_sint') AudioManager.stopAll()
});

// Создаем объект для управления звуком
const AudioManager = (function () {
    // Приватные свойства менеджера
    let audioContext = null;
    const audioBufferCache = {}; // Кэш для загруженных звуков
    const activeSources = {}; // Хранилище для активных источников звука

    // Инициализация контекста (создаётся только один раз)
    function getAudioContext() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioContext;
    }

    // Вспомогательная функция для остановки всех звуков одного инструмента
    function stopInstrument(instrument) {
        if (activeSources[instrument]) {
            // Проходим по всем активным источникам инструмента и останавливаем их
            activeSources[instrument].forEach(source => {
                // Проверяем, что источник еще играет или запланирован к запуску
                if (source.playbackState === source.PLAYING_STATE || source.playbackState === source.SCHEDULED_STATE) {
                    source.stop(0);
                }
            });
            // Очищаем массив источников для этого инструмента
            activeSources[instrument] = [];
        }
    }

    // Функция для загрузки и кэширования звука
    async function loadSound(instrument) {
        if (audioBufferCache[instrument]) {
            return audioBufferCache[instrument];
        }
        const response = await fetch(`./sound/${instrument}.mp3`);
        if (!response.ok) {
            throw new Error(`Не удалось загрузить звук: ./sound/${instrument}.mp3`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await getAudioContext().decodeAudioData(arrayBuffer);
        audioBufferCache[instrument] = audioBuffer;
        return audioBuffer;
    }

    return {
        // Модифицированный метод play
        async play(instrument) {
            if (!instrument) return;

            try {
                const ctx = getAudioContext();
                if (ctx.state === 'suspended') {
                    await ctx.resume();
                }

                const buffer = await loadSound(instrument);

                // 1. Останавливаем уже играющий звук этого инструмента (если есть)
                stopInstrument(instrument);

                // 2. Создаем НОВЫЙ источник для этого воспроизведения
                const source = ctx.createBufferSource();
                source.buffer = buffer;
                source.connect(ctx.destination);

                // 3. Сохраняем ссылку на источник в нашем хранилище
                if (!activeSources[instrument]) {
                    activeSources[instrument] = [];
                }
                activeSources[instrument].push(source);

                // 4. Запускаем воспроизведение
                source.start(0);

                // 5. Добавляем обработчик события 'onended'.
                // Когда звук закончится, он сам удалит себя из массива активных источников.
                source.onended = () => {
                    activeSources[instrument] = activeSources[instrument].filter(s => s !== source);
                    // console.log(`Звук ${instrument} закончился.`);
                };

                // Управление классом 'active'
                if (instrument !== 'bit' && instrument !== 'stop' && instrument !== 'sint' && instrument !== 'sint2' && instrument !== 'sint3') { // Предположительно, 'sint' не имеет визуального элемента
                    document.getElementById(instrument).setAttribute('class', 'active');
                }

            } catch (error) {
                // console.error('Ошибка в AudioManager:', error.message);
            }
        },

        //Остановка звука по клику или в любой другой момент
        stop(instrument) {
            if (!instrument) return;
            stopInstrument(instrument);

            // Убираем визуальное отображение 'active'
            if (instrument !== 'bit' && instrument !== 'stop' && instrument !== 'sint' && instrument !== 'sint2' && instrument !== 'sint3') {
                document.getElementById(instrument).classList.remove('active');
            }
        },

        // Дополнительный метод: Остановить абсолютно все звуки
        stopAll() {
            for (const instrument in activeSources) {
                stopInstrument(instrument);
                // document.getElementById(instrument).classList.remove('active');                
            }
        }
    };
})();



