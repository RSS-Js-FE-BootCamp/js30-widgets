const video = document.querySelector('.video_player');
const playerControl = document.querySelector('.player_control');
const volumeRange = document.querySelector('.range_1');
const speedRange = document.querySelector('.range_2');
const backward = document.querySelector('.backward');
const forward = document.querySelector('.forward');
const timelineLine = document.querySelector('.timeline_control_line');
const timelineWrapper = document.querySelector('.timeline_control_wrapper');
const video0 = document.querySelector('.video_0');
const video1 = document.querySelector('.video_1');
const video2 = document.querySelector('.video_2');
const video3 = document.querySelector('.video_3');

playerControl.addEventListener("click", (event) => {
    toggleVideo();
})
video.addEventListener("click", (event) => {
    toggleVideo();
})

function toggleVideo() {
    const status = playerControl.classList.contains('play');
    if (status) {
        playerControl.innerText = '❚ ❚'
        playerControl.classList.remove('play')
        video.play();
    } else {
        playerControl.classList.add('play')
        playerControl.innerText = '►'
        video.pause();
    }
}

function stopVideo() {
    const status = playerControl.classList.contains('play');
    if (!status) {
        playerControl.classList.add('play')
    }
    playerControl.innerText = '►'
    video.pause();
    video.currentTime = 0;
    timelineLine.style.width = 0;
}

backward.addEventListener("click", (event) => {
    video.currentTime -= 10;
})
forward.addEventListener("click", (event) => {
    video.currentTime += 25;
})

video.addEventListener("timeupdate", (event) => {
    const currentTime = video.currentTime;
    const duration = video.duration;
    const videoWatched = currentTime / (duration / 100);
    timelineLine.style.width = `${videoWatched}%`
});



timelineWrapper.addEventListener('click', (element) => {
    let percent;
    if (element.target.classList.contains('timeline_control_line')) {
        const parentWidth = parseFloat(getComputedStyle(element.target.parentElement).width);
        const childWidth = parseFloat(getComputedStyle(element.target).width);
        percent = (childWidth / parentWidth) * 100;
    } else {
        const parentWidth = parseFloat(getComputedStyle(element.target).width);
        const childWidth = parseFloat(getComputedStyle(element.target.children[0]).width);
        percent = (childWidth / parentWidth) * 100;
    }
})

function changeVideoTimeMouse(event) {
    let clickedElement;

    if (event.target.classList.contains('timeline_control_line')) {
        clickedElement = event.target.parentElement;
    } else {
        clickedElement = event.target;
    }

    const parentData = clickedElement.getBoundingClientRect();
    const clickedPosition = event.clientX - parentData.left;
    const newTimePercentage = (clickedPosition / parentData.width) * 100;
    const duration = video.duration;
    let newTime = duration / 100 * newTimePercentage
    if (newTime <= 0) {
        newTime = 0
    }

    video.currentTime = newTime;
}

function changeVideoTimeKeyboard(time) {
    const duration = video.duration;
    let newTime = duration / 100 * time
    if (newTime <= 0) {
        newTime = 0
    }
    video.currentTime = newTime;
}


let mousedown = false;
timelineWrapper.addEventListener('click', (event) => {
    changeVideoTimeMouse(event)
});

timelineWrapper.addEventListener('mousemove', (event) => {
    mousedown && changeVideoTimeMouse(event)
});

timelineWrapper.addEventListener('mousedown', () => {
    mousedown = true
});

document.addEventListener('mouseup', () => {
    mousedown = false
});


volumeRange.addEventListener('input', (event) => {
    handleVolumeChange(
        event.target.value
    )
});

volumeRange.addEventListener('change', (event) => {
    handleVolumeChange(event.target.value)
});

speedRange.addEventListener('input', (event) => {
    handleSpeedChange(event.target.value)
});

speedRange.addEventListener('change', (event) => handleSpeedChange(event.target.value));

function handleVolumeChange(volumeChange) {

    video.volume = volumeChange;

    if (video.volume == 0) {
        video.classList.add('mute')
    } else {
        video.classList.remove('mute')
    }
}

function handleSpeedChange(speedChange) {
    video.playbackRate = speedChange;
}

let lastVolume = video.volume;

document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
        return;
    }

    if (e.key == " " ||
        e.code == "Space" ||
        e.keyCode == 32 ||

        e.key == "k" ||
        e.code == "KeyK" ||
        e.keyCode == 75 ||
        e.key == 'л'
    ) {
        if (e.code == "Space") {
            e.preventDefault();
        }
        toggleVideo();
    }

    if (e.key.toLowerCase() === "M" || e.key.toLowerCase() === "Ь" || e.keyCode == 77) {
        if (video.classList.contains('mute')) {
            video.classList.remove('mute')
            video.volume = lastVolume;
            volumeRange.value = lastVolume;
            lastVolume = 0;
        } else {
            video.classList.add('mute')
            lastVolume = video.volume;
            video.volume = 0;
            volumeRange.value = 0;
        }
    }

    if ((e.shiftKey && (e.key === ">" || e.key === "Ю" || e.key === "."))) {
        if (Number(speedRange.value) < 2) {
            video.playbackRate += 0.1;
            speedRange.value = Number(speedRange.value) + 0.1;
        }
    }


    if (e.shiftKey && (e.key === "<" || e.key === "Б" || e.key === ",")) {
        if (Number(speedRange.value) > 0.5) {
            video.playbackRate -= 0.1;
            speedRange.value = Number(speedRange.value) - 0.1;
        }
    }

    if (!e.shiftKey && (e.key === "<" || e.key.toLowerCase() === "б" || e.keyCode == 188)) {
        if (!playerControl.classList.contains('play')) {
            video.playbackRate -= 0.1;
            speedRange.value = Number(speedRange.value) - 0.1;
        } else {
            changeFrame('backward')
        }
    }


    if (!e.shiftKey && (e.key === ">" || e.key.toLowerCase() === "ю" || e.keyCode == 190)) {
        if (!playerControl.classList.contains('play')) {
            video.playbackRate += 0.1;
            speedRange.value = Number(speedRange.value) + 0.1;
        } else {
            changeFrame('forward')
        }
    }







    if (e.key.toLowerCase() === "F" || e.key.toLowerCase() === "А" || e.keyCode == 70) {
        if (video.classList.contains('fullscreen')) {
            closeFullscreen()
            video.classList.remove('fullscreen')
        } else {
            openFullscreen()
            video.classList.add('fullscreen')
        }
    }




    if (e.key === "ArrowLeft" || e.keyCode == 37) {
        e.preventDefault();
        video.currentTime = Math.max(0, video.currentTime - 5);
    }


    if (e.key === "ArrowRight" || e.keyCode == 39) {
        e.preventDefault();
        video.currentTime = Math.min(video.duration, video.currentTime + 5);
    }


    if (e.key === "ArrowUp" || e.keyCode == 38) {
        e.preventDefault();
        let newVolume = Math.min(1, video.volume + 0.1);
        video.volume = newVolume;
        volumeRange.value = newVolume;
        if (video.classList.contains('mute')) {
            video.classList.remove('mute');
        }
    }


    if (e.key === "ArrowDown" || e.keyCode == 40) {
        e.preventDefault();
        let newVolume = Math.max(0, video.volume - 0.1);
        video.volume = newVolume;
        volumeRange.value = newVolume;
        if (newVolume === 0) {
            video.classList.add('mute');
            lastVolume = 0;
        } else if (video.classList.contains('mute')) {
            video.classList.remove('mute');
        }
    }



    if (e.key.toLowerCase() === "0" || e.key.toLowerCase() === "0" || e.keyCode == 48) {
        video.currentTime = 0
    }
    if (e.key.toLowerCase() === "1" || e.key.toLowerCase() === "1" || e.keyCode == 49) {
        changeVideoTimeKeyboard(10)
    }
    if (e.key.toLowerCase() === "2" || e.key.toLowerCase() === "2" || e.keyCode == 50) {
        changeVideoTimeKeyboard(20)
    }
    if (e.key.toLowerCase() === "3" || e.key.toLowerCase() === "3" || e.keyCode == 51) {
        changeVideoTimeKeyboard(30)
    }
    if (e.key.toLowerCase() === "4" || e.key.toLowerCase() === "4" || e.keyCode == 52) {
        changeVideoTimeKeyboard(40)
    }
    if (e.key.toLowerCase() === "5" || e.key.toLowerCase() === "5" || e.keyCode == 53) {
        changeVideoTimeKeyboard(50)
    }
    if (e.key.toLowerCase() === "6" || e.key.toLowerCase() === "6" || e.keyCode == 54) {
        changeVideoTimeKeyboard(60)
    }
    if (e.key.toLowerCase() === "7" || e.key.toLowerCase() === "7" || e.keyCode == 55) {
        changeVideoTimeKeyboard(70)
    }
    if (e.key.toLowerCase() === "8" || e.key.toLowerCase() === "8" || e.keyCode == 56) {
        changeVideoTimeKeyboard(80)
    }
    if (e.key.toLowerCase() === "9" || e.key.toLowerCase() === "9" || e.keyCode == 57) {
        changeVideoTimeKeyboard(90)
    }






    if (e.key.toLowerCase() === "j" || e.key.toLowerCase() === "о" || e.keyCode == 74) {
        video.currentTime = Number(video.currentTime) - 10;
    }
    if (e.key.toLowerCase() === "l" || e.key.toLowerCase() === "д" || e.keyCode == 76) {
        video.currentTime = Number(video.currentTime) + 10;
    }






})





function openFullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}


function changeFrame(type) {
    const fps = video.getVideoPlaybackQuality?.()?.totalVideoFrames /
        video.getVideoPlaybackQuality?.()?.totalFrameDelay || 30;
    const frameStep = 1 / fps;
    if (type === 'backward') {

        video.currentTime = Math.max(Number(video.currentTime - frameStep, 0));
    } else if (type === 'forward') {
        video.currentTime = Math.max(Number(video.currentTime + frameStep, 0));

    }

}

const videos = [
    { src: './video/652333414.mp4', preview: './preview/Preview_0.jpg' },
    { src: './video/armada2.mp4', preview: './preview/Preview_1.jpg' },
    { src: './video/genshin.mp4', preview: './preview/Preview_2.jpg' },
    { src: './video/no_citizen.mp4', preview: './preview/Preview_3.jpg' }
];

let currentVideoIndex = 0;

document.querySelectorAll('.video_preview').forEach((preview, index) => {
    preview.addEventListener('click', () => {
        loadVideo(index);
    });
});

function loadVideo(videoIndex) {
    if (videoIndex < 0 || videoIndex >= videos.length) {
        return
    };
    currentVideoIndex = videoIndex;
    video.src = videos[videoIndex].src;
    stopVideo();
    document.querySelectorAll('.video_preview').forEach((e, i) => {
        e.classList.toggle('active', i === videoIndex);
    });
}

const prevVideo = document.querySelector('.carousel_prev');
const nextVideo = document.querySelector('.carousel_next');

prevVideo.addEventListener('click', () => {
    const newIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
    loadVideo(newIndex);
});

nextVideo.addEventListener('click', () => {
    const newIndex = (currentVideoIndex + 1) % videos.length;
    loadVideo(newIndex);
});

