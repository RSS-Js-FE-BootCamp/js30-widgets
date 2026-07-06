const videos = [
    {
        id: 1,
        title: 'Smile',
        artist: 'БЕЛЫЙ КИТАЕЦ',
        description: 'Энергичный трек с позитивным настроением.',
        src: './videos/smile.mp4',
        poster: './posters/smile_poster.jpg'
    },
    {
        id: 2,
        title: 'Green Door',
        artist: 'БЕЛЫЙ КИТАЕЦ',
        description: 'Загадочная атмосфера и плотный бас.',
        src: './videos/green_door.mp4',
        poster: './posters/green_door_poster.jpg'
    },
    {
        id: 3,
        title: 'Sad Natasha',
        artist: 'БЕЛЫЙ КИТАЕЦ',
        description: 'Меланхоличная баллада о любви и потере.',
        src: './videos/sad_natasha.mp4',
        poster: './posters/sad_natasha_poster.jpg'
    },
    {
        id: 4,
        title: 'Recording Over Life',
        artist: 'БЕЛЫЙ КИТАЕЦ',
        description: 'Экспериментальный трек с живыми инструментами.',
        src: './videos/recording_over_life.mp4',
        poster: './posters/recording_over_life_poster.jpg'
    }
];
const video = document.getElementById('player');
const playBtn = document.querySelector('.play-btn');
const progress = document.querySelector('.progress-bar');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');
const muteBtn = document.querySelector('.mute-btn');
const volumeSlider = document.querySelector('.volume-slider');
const speedBtn = document.querySelector('.speed-btn');
const fullscreenBtn = document.querySelector('.fullscreen-btn');
const trackTitleEl = document.querySelector('.track-title');
const trackArtistEl = document.querySelector('.track-artist');

let isPlaying = false;

function togglePlay() {
    if (video.paused) {
        video.play();
        playBtn.textContent = '⏸';
        isPlaying = true;
    } else {
        video.pause();
        playBtn.textContent = '▶';
        isPlaying = false;
    }
}
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

video.addEventListener('timeupdate', () => {
    const percent = (video.currentTime / video.duration) * 100;
    progress.value = percent;
    currentTimeEl.textContent = formatTime(video.currentTime);
    durationEl.textContent = formatTime(video.duration);
});

video.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(video.duration);
});

progress.addEventListener('input', () => {
    const time = (progress.value / 100) * video.duration;
    video.currentTime = time;
});

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

volumeSlider.addEventListener('input', () => {
    video.volume = volumeSlider.value;
    updateMuteButton();
});

muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    updateMuteButton();
});

function updateMuteButton() {
    if (video.muted || video.volume === 0) {
        muteBtn.textContent = '🔇';
    } else {
        muteBtn.textContent = '🔊';
    }
}

speedBtn.addEventListener('click', () => {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    let current = parseFloat(speedBtn.dataset.speed);
    let idx = speeds.indexOf(current);
    idx = (idx + 1) % speeds.length;
    const newSpeed = speeds[idx];
    video.playbackRate = newSpeed;
    speedBtn.textContent = newSpeed + '×';
    speedBtn.dataset.speed = newSpeed;
});

fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const key = e.key;
    if (key === ' ' || key === 'Space') {
        e.preventDefault();
        togglePlay();
    } else if (key === 'k' || key === 'K') {
        e.preventDefault();
        togglePlay();
    } else if (key === 'ArrowRight') {
        e.preventDefault();
        video.currentTime = Math.min(video.currentTime + 5, video.duration);
    } else if (key === 'ArrowLeft') {
        e.preventDefault();
        video.currentTime = Math.max(video.currentTime - 5, 0);
    } else if (key === 'ArrowUp') {
        e.preventDefault();
        video.volume = Math.min(video.volume + 0.05, 1);
        volumeSlider.value = video.volume;
        updateMuteButton();
    } else if (key === 'ArrowDown') {
        e.preventDefault();
        video.volume = Math.max(video.volume - 0.05, 0);
        volumeSlider.value = video.volume;
        updateMuteButton();
    } else if (key === 'j' || key === 'J') {
        e.preventDefault();
        video.currentTime = Math.max(video.currentTime - 10, 0);
    } else if (key === 'l' || key === 'L') {
        e.preventDefault();
        video.currentTime = Math.min(video.currentTime + 10, video.duration);
    } else if (key === 'm' || key === 'M') {
        e.preventDefault();
        video.muted = !video.muted;
        updateMuteButton();
    } else if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        const percent = parseInt(key) * 10;
        if (percent <= 100) {
            video.currentTime = (percent / 100) * video.duration;
        }
    } else if (key === 'f' || key === 'F') {
        e.preventDefault();
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
    else if (key === ',') {
        e.preventDefault();
        video.currentTime = Math.max(video.currentTime - 0.05, 0);
    } else if (key === '.') {
        e.preventDefault();
        video.currentTime = Math.min(video.currentTime + 0.05, video.duration);
    } else if (key === 'c' || key === 'C') {
        e.preventDefault();
        console.log('Субтитры не реализованы (нет субтитров в этом видео)');
    }
});
function loadVideo(videoData) {
    video.src = videoData.src;
    video.poster = videoData.poster;
    video.load();
    video.play();
    playBtn.textContent = '⏸';
    isPlaying = true;
    trackTitleEl.textContent = videoData.title;
    trackArtistEl.textContent = `🎵 ${videoData.artist}`;
    const idx = videos.indexOf(videoData);
    setActiveCarousel(idx);
    const maxIndex = Math.max(0, videos.length - itemsPerView);
    if (idx > currentCarouselIndex + itemsPerView - 1) {
        currentCarouselIndex = Math.min(idx - itemsPerView + 1, maxIndex);
        updateCarousel();
    } else if (idx < currentCarouselIndex) {
        currentCarouselIndex = Math.max(idx, 0);
        updateCarousel();
    }
}
const catalogGrid = document.querySelector('.catalog-grid');

videos.forEach(videoData => {
    const item = document.createElement('div');
    item.className = 'catalog-item';
    item.innerHTML = `
    <img src="${videoData.poster}" alt="${videoData.title}">
    <div class="info">
      <div class="title">${videoData.title}</div>
      <div class="artist">${videoData.artist}</div>
      <div class="desc">${videoData.description}</div>
    </div>
  `;
    item.addEventListener('click', () => loadVideo(videoData));
    catalogGrid.appendChild(item);
});
const carouselTrack = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
let currentCarouselIndex = 0;
const itemsPerView = 3;
function buildCarousel() {
    carouselTrack.innerHTML = '';
    videos.forEach((videoData, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.dataset.index = index;
        item.innerHTML = `
      <img src="${videoData.poster}" alt="${videoData.title}">
      <span>${videoData.title}</span>
      <span style="font-size:0.6rem; color:#f1c40f;">${videoData.artist}</span>
    `;
        item.addEventListener('click', () => {
            loadVideo(videoData);
            setActiveCarousel(index);
        });
        carouselTrack.appendChild(item);
    });
    setActiveCarousel(0);
    updateCarousel();
}
function setActiveCarousel(index) {
    document.querySelectorAll('.carousel-item').forEach((el, i) => {
        el.classList.toggle('active', i === index);
    });
}
function updateCarousel() {
    const total = videos.length;
    const maxIndex = Math.max(0, total - itemsPerView);
    if (currentCarouselIndex > maxIndex) currentCarouselIndex = maxIndex;
    const offset = currentCarouselIndex * (120 + 12);
    carouselTrack.style.transform = `translateX(-${offset}px)`;
    prevBtn.disabled = currentCarouselIndex === 0;
    nextBtn.disabled = currentCarouselIndex >= maxIndex;
    prevBtn.style.opacity = prevBtn.disabled ? 0.3 : 1;
    nextBtn.style.opacity = nextBtn.disabled ? 0.3 : 1;
}
prevBtn.addEventListener('click', () => {
    if (currentCarouselIndex > 0) {
        currentCarouselIndex--;
        updateCarousel();
    }
});
nextBtn.addEventListener('click', () => {
    const maxIndex = Math.max(0, videos.length - itemsPerView);
    if (currentCarouselIndex < maxIndex) {
        currentCarouselIndex++;
        updateCarousel();
    }
});
loadVideo(videos[0]);
buildCarousel();