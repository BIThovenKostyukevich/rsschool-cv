const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

let isPlaying = false;

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = 'Play';
    } else {
        audio.play();
        playPauseBtn.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
});


audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;

    progressBar.value = (currentTime / duration) * 100;

    currentTimeEl.textContent = formatTime(currentTime);
    if (duration) {
        durationEl.textContent = formatTime(duration);
    }
});

progressBar.addEventListener('input', (e) => {
    const newTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = newTime;
});

audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
});
