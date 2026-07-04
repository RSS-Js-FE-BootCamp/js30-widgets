class CustomVideoPlayer {
  static getVideoTag() {
    const VIDEO = document.getElementById("video");

    if (!VIDEO) {
      throw new Error(`Не найден узел: #video`);
    }

    return VIDEO;
  }

  static togglePlay() {
    const VIDEO = this.getVideoTag();

    const BUTTON = document.getElementById("video__play_stop_button");

    if (!BUTTON) {
      throw new Error(`Узел не найден: #video__play_stop_button`);
    }

    if (VIDEO.paused) {
      VIDEO.play();
      BUTTON.innerHTML = "⏸";
    } else {
      VIDEO.pause();
      BUTTON.innerHTML = "▶";
    }
  }

  static plus10() {
    const VIDEO = this.getVideoTag();

    VIDEO.currentTime = Math.min(
      VIDEO.currentTime + 10,
      VIDEO.duration || Infinity,
    );
  }

  static minus5() {
    const VIDEO = this.getVideoTag();

    VIDEO.currentTime = Math.max(VIDEO.currentTime - 5, 0);
  }

  static getVideoDuration(videoElement) {
    const VIDEO = this.getVideoTag();

    if (!VIDEO) {
      return 0;
    }

    return VIDEO.duration;
  }

  static getCurrentTime(videoElement) {
    const VIDEO = this.getVideoTag();

    if (!VIDEO) {
      return 0;
    }

    return VIDEO.currentTime;
  }

  static formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
      return "00:00";
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  static getVideoInfo(videoElement) {
    const VIDEO = this.getVideoTag();

    if (!VIDEO) {
      return null;
    }

    return {
      duration: VIDEO.duration,
      currentTime: VIDEO.currentTime,
      durationFormatted: this.formatTime(VIDEO.duration),
      currentTimeFormatted: this.formatTime(VIDEO.currentTime),
      progress: (VIDEO.currentTime / VIDEO.duration) * 100 || 0,
    };
  }

  static setVideoToPercent(percent) {
    const VIDEO = this.getVideoTag();

    const duration = VIDEO.duration;
    if (!duration || isNaN(duration)) {
      return;
    }

    VIDEO.currentTime = duration * percent;
  }

  static updateProgress(video_value) {
    const PROGRESS = document.getElementById("video__progress");
    if (!PROGRESS) {
      throw new Error(`Не найден узел: #video__progress`);
    }

    const X = (640 * video_value) / 100;

    PROGRESS.style.width = `${X}px`;
  }

  static mute() {
    const VIDEO = this.getVideoTag();

    const MUTE_BUTTON = document.getElementById("video__mute_button");

    if (!MUTE_BUTTON) {
      throw new Error(`Не найден узел: #video__mute_button`);
    }

    const MUTE_VOLUME_RANGE = document.getElementById(
      "video__mute_volume_range",
    );

    if (!MUTE_VOLUME_RANGE) {
      throw new Error(`Не найден узел: #video__mute_volume_range`);
    }

    if (!VIDEO) {
      return null;
    }

    VIDEO.muted = !VIDEO.muted;
    MUTE_BUTTON.innerHTML = VIDEO.muted ? "🔇" : "🔊";

    if (!VIDEO.muted) {
      this.setVideoVolume(MUTE_VOLUME_RANGE.getAttribute("data-prev-value"));
    } else {
      this.setVideoVolume(0);
    }
  }

  static setVideoVolume(volume) {
    const VIDEO = this.getVideoTag();

    const MUTE_BUTTON = document.getElementById("video__mute_button");

    if (!MUTE_BUTTON) {
      throw new Error(`Не найден узел: #video__mute_button`);
    }

    const MUTE_VOLUME_RANGE = document.getElementById(
      "video__mute_volume_range",
    );

    if (!MUTE_VOLUME_RANGE) {
      throw new Error(`Не найден узел: #video__mute_volume_range`);
    }

    const NORMALIZED_VOLUME = Math.max(0, Math.min(1, volume));

    VIDEO.muted = NORMALIZED_VOLUME == 0;
    MUTE_BUTTON.innerHTML = VIDEO.muted ? "🔇" : "🔊";

    VIDEO.volume = NORMALIZED_VOLUME;

    MUTE_VOLUME_RANGE.value = NORMALIZED_VOLUME;
  }

  static savePrevValue(element) {
    if (element.value == 0) {
      return;
    }

    element.setAttribute("data-prev-value", element.value);
  }

  static toggleVideoFullscreen() {
    const VIDEO = this.getVideoTag();

    if (document.fullscreenElement === VIDEO) {
      document.exitFullscreen();
      return false;
    }

    VIDEO.requestFullscreen();
    return true;
  }

  static speedUpdate(speed) {
    if (speed < 0 || speed > 3) {
      return;
    }

    video.playbackRate = speed;

    const SPEED_RANGE = document.getElementById("video__speed_range");
    if (!SPEED_RANGE) {
      throw new Error(`Узел не найден: #video__speed_range`);
    }

    SPEED_RANGE.value = speed;

    const SPEED_VALUE = document.getElementById("video__speed_value");
    if (!SPEED_VALUE) {
      throw new Error(`Узел не найден: #video__speed_value`);
    }

    SPEED_VALUE.innerHTML = `Video speed := ${Number(speed).toFixed(2)}`;
  }
}

document.addEventListener("keydown", function (event) {
  switch (event.code) {
    case "Space":
    case "KeyK":
      CustomVideoPlayer.togglePlay();
      return;

    case "KeyF":
      CustomVideoPlayer.toggleVideoFullscreen();
      return;

    case "KeyJ":
      CustomVideoPlayer.minus5();
      return;

    case "KeyL":
      CustomVideoPlayer.plus10();
      return;

    case "KeyM":
      CustomVideoPlayer.mute();
      return;

    case "Digit0":
      CustomVideoPlayer.setVideoToPercent(0);
      return;

    case "Digit1":
      CustomVideoPlayer.setVideoToPercent(0.1);
      return;

    case "Digit2":
      CustomVideoPlayer.setVideoToPercent(0.2);
      return;

    case "Digit3":
      CustomVideoPlayer.setVideoToPercent(0.3);
      return;

    case "Digit4":
      CustomVideoPlayer.setVideoToPercent(0.4);
      return;

    case "Digit5":
      CustomVideoPlayer.setVideoToPercent(0.5);
      return;

    case "Digit6":
      CustomVideoPlayer.setVideoToPercent(0.6);
      return;

    case "Digit7":
      CustomVideoPlayer.setVideoToPercent(0.7);
      return;

    case "Digit8":
      CustomVideoPlayer.setVideoToPercent(0.8);
      return;

    case "Digit9":
      CustomVideoPlayer.setVideoToPercent(0.9);
      return;

    default:
      return;
  }
});

(function () {
  const VIDEO = CustomVideoPlayer.getVideoTag();

  VIDEO.addEventListener("timeupdate", () => {
    const INFO = CustomVideoPlayer.getVideoInfo();
    CustomVideoPlayer.updateProgress(INFO.progress);

    const VIDEO_TIME = document.getElementById("video__time");

    if (!VIDEO_TIME) {
      throw new Error(`Не найден узел: #video__time`);
    }

    VIDEO_TIME.innerHTML = `${INFO.currentTimeFormatted} / ${INFO.durationFormatted}`;
  });
})();
