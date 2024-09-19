const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const trackNameEl = document.getElementById('track-name');
const artistNameEl = document.getElementById('artist-name');
const coverEl = document.getElementById('cover');

let isPlaying = false;
let trackIndex = 0;

const tracks = [
    { name: "Do-you-hear-the-people-sing", artist: "orchestra", src: "Do-you-hear-the-people-sing.mp3", cover: "1.png" },
    { name: "Развітанне з Радзімай", artist: "М.К. Агінскi", src: "Паланэз М.К. Агінскага. Развітанне з Радзімай. A-moll polonez. Pożegnanie Ojczyzny.mp3", cover: "2.png" },
    { name: "Waltz No. 2", artist: "Dmitri Shostakovich", src: "Dmitri Shostakovich - Waltz No. 2.mp3", cover: "3.png" },
];

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
        playPauseBtn.textContent = 'Stop';
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

function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    trackNameEl.textContent = track.name;
    artistNameEl.textContent = track.artist;
    coverEl.src = track.cover;
    audio.load();
}

nextBtn.addEventListener('click', () => {
    trackIndex = (trackIndex + 1) % tracks.length; 
    loadTrack(trackIndex);
    if (isPlaying) audio.play();
});

prevBtn.addEventListener('click', () => {
    trackIndex = (trackIndex - 1 + tracks.length) % tracks.length; 
    loadTrack(trackIndex);
    if (isPlaying) audio.play();
});

loadTrack(trackIndex);
