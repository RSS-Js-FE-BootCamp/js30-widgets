const video = document.querySelector('.video_player');
const playerControl = document.querySelector('.player_control');
const volumeRange = document.querySelector('.range_1');
const speedRange = document.querySelector('.range_2');
const backward = document.querySelector('.backward');
const forward = document.querySelector('.forward');
const timelineLine = document.querySelector('.timeline_control_line');
const timelineWrapper = document.querySelector('.timeline_control_wrapper');

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


volumeRange.addEventListener('input', (event) => handleVolumeChange(event.target.value));
volumeRange.addEventListener('change', (event) => handleVolumeChange(event.target.value));

speedRange.addEventListener('input', (event) => handleSpeedChange(event.target.value));
speedRange.addEventListener('change', (event) => handleSpeedChange(event.target.value));

function handleVolumeChange(volumeChange) {
    video.volume = volumeChange / 100
}

function handleSpeedChange(speedChange) {
    video.playbackRate = 0.5 + (speedChange / 100) * 3.5;
}
