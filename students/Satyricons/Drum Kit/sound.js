document.addEventListener('click', function (event) {AudioManager.play(event.target.id); });
document.addEventListener('keydown', function (event) {
    if (event.keyCode === 65) AudioManager.play('clap')
    if (event.keyCode === 83) AudioManager.play('hat')
    if (event.keyCode === 68) AudioManager.play('kik')
    if (event.keyCode === 70) AudioManager.play('openhat')
    if (event.keyCode === 71) AudioManager.play('boom')
    if (event.keyCode === 72) AudioManager.play('ride')
    if (event.keyCode === 74) AudioManager.play('snare')
    if (event.keyCode === 75) AudioManager.play('tom')
    if (event.keyCode === 76) AudioManager.play('tink')               
});

// Создаем объект для управления звуком
const AudioManager = (function() {
    // Приватные свойства менеджера
    let audioContext = null;
    const audioBufferCache = {}; // Кэш для загруженных звуков

    // Инициализация контекста (создаётся только один раз)
    function getAudioContext() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioContext;
    }

    // Функция для загрузки и кэширования звука
    async function loadSound(instrument) {
        // Если звук уже есть в кэше, возвращаем его
        if (audioBufferCache[instrument]) {
            console.log(`[Кэш] Загружен ${instrument}`);
            return audioBufferCache[instrument];
        }

        console.log(`[Сеть] Загружается ${instrument}...`);
        const response = await fetch(`./sound/${instrument}.mp3`);

        if (!response.ok) {
            throw new Error(`Не удалось загрузить звук: ./sound/${instrument}.mp3`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await getAudioContext().decodeAudioData(arrayBuffer);

        // Сохраняем в кэш для будущего использования
        audioBufferCache[instrument] = audioBuffer;
        console.log(`[Кэш] Сохранен ${instrument}`);
        return audioBuffer;
    }

    // Публичная функция play, которую мы будем вызывать извне
    return {
        async play(instrument) {
            if (!instrument) return;

            try {
                // 1. Получаем контекст (создаём, если его нет)
                const ctx = getAudioContext();

                // 2. Проверяем, не заблокирован ли контекст (важный шаг!)
                if (ctx.state === 'suspended') {
                    await ctx.resume(); // Возобновляем работу контекста
                }

                // 3. Загружаем звук (из кэша или с сервера)
                const buffer = await loadSound(instrument);

                // 4. Воспроизводим звук
                const source = ctx.createBufferSource();
                source.buffer = buffer;
                source.connect(ctx.destination);
                source.start(0);
            } catch (error) {
                console.error('Ошибка в AudioManager:', error.message);
            }
        }
    };
})();

