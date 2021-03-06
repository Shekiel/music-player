const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durrationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
  {
    name: 'three-little-birds',
    displayName: '3 Little Birds',
    artist: 'Bob Marley',
  },
  {
    name: 'heal-the-world',
    displayName: 'Heal The World',
    artist: 'Michael Jackson',
  },
  {
    name: 'every-time-we-touch',
    displayName: 'Everytime We Touch',
    artist: 'Cascada',
  },
  {
    name: 'dont-stop-me-now',
    displayName: "Don't Stop Me Now",
    artist: 'Queen',
  },
  {
    name: 'i-will-always-love-you',
    displayName: 'I Will Always Love You',
    artist: 'Whitney Houston',
  },
  {
    name: 'karma-chameleon',
    displayName: 'Karma Chameleon',
    artist: 'Culture Club',
  },
  {
    name: 'wonderwall',
    displayName: 'Wonderwall',
    artist: 'Oasis',
  },
];

//Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

//Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar and Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    // Update Progress Bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);

    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    // Delay switching duration elements to avoid NaN
    if (durationSeconds) {
      durrationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for duration
    const currentMinutes = Math.floor(currentTime / 60);

    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progree Bar
function setProgressBar(e) {
  console.log(e);
  const width = this.clientWidth;
  console.log('width', width);
  const clickX = e.offsetX;
  console.log('clickX', clickX);
  const { duration } = music;
  console.log(clickX / width);
  console.log((clickX / width) * duration);
  music.currentTime = (clickX / width) * duration;
}

//  Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
