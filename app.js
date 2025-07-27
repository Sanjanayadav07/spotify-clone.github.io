let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let songItems = Array.from(document.getElementsByClassName('songItemPlay'));
let masterSongName = document.getElementById('masterSongName');

let currentSongIndex = 0;

let songs = [
  { songName: "Feel Good", filePath: "songs/1.mp3", coverPath: "cover/1.jpg" },
  { songName: "Invincible", filePath: "songs/2.mp3", coverPath: "cover/2.jpg" },
  { songName: "Mortals", filePath: "songs/3.mp3", coverPath: "cover/3.jpg" },
  { songName: "Shine", filePath: "songs/4.mp3", coverPath: "cover/4.jpg" },
  { songName: "Why We Lose", filePath: "songs/5.mp3", coverPath: "cover/5.jpg" },
  { songName: "Sky High", filePath: "songs/6.mp3", coverPath: "cover/6.jpg" },
  { songName: "Symbolism", filePath: "songs/7.mp3", coverPath: "cover/7.jpg" },
  { songName: "Heroes Tonight", filePath: "songs/8.mp3", coverPath: "cover/8.jpg" },
  { songName: "Feel Good", filePath: "songs/9.mp3", coverPath: "cover/9.jpg" },
  { songName: "My Heart", filePath: "songs/10.mp3", coverPath: "cover/10.jpg" }
];

const resetPlayButtons = () => {
  songItems.forEach((el) => {
    el.classList.remove('fa-pause-circle');
    el.classList.add('fa-play-circle');
  });
};

const playSong = (index) => {
  audioElement.src = songs[index].filePath;
  masterSongName.innerText = songs[index].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
};

songItems.forEach((el, i) => {
  el.addEventListener('click', () => {
    if (currentSongIndex === i && !audioElement.paused) {
      audioElement.pause();
      el.classList.remove('fa-pause-circle');
      el.classList.add('fa-play-circle');
      masterPlay.classList.add('fa-play-circle');
    } else {
      currentSongIndex = i;
      resetPlayButtons();
      el.classList.remove('fa-play-circle');
      el.classList.add('fa-pause-circle');
      playSong(i);
    }
  });
});

masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    playSong(currentSongIndex);
    songItems[currentSongIndex].classList.remove('fa-play-circle');
    songItems[currentSongIndex].classList.add('fa-pause-circle');
  } else {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    resetPlayButtons();
  }
});

audioElement.addEventListener('timeupdate', () => {
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});
