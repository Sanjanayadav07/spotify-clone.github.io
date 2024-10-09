
  // Initialize audio and variables
let audioElement = new Audio('/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let songItems = Array.from(document.getElementsByClassName('songItemPlay'));
let masterSongName = document.getElementById('masterSongName');
let currentAudio = null;
let currentSongIndex = 0;

// Song data
let songs = [
    { songName: "Feel Good", filePath: "/songs/1.mp3", coverPath: "cover/1.jpg" },
    { songName: "Invincible", filePath: "/songs/2.mp3", coverPath: "cover/2.jpg" },
    { songName: "Mortals", filePath: "/songs/3.mp3", coverPath: "cover/3.jpg" },
    { songName: "Shine", filePath: "/songs/4.mp3", coverPath: "cover/4.jpg" },
    { songName: "Why We Lose", filePath: "/songs/5.mp3", coverPath: "cover/5.jpg" },
    { songName: "Sky High", filePath: "/songs/6.mp3", coverPath: "cover/6.jpg" },
    { songName: "Symbolism", filePath: "/songs/7.mp3", coverPath: "cover/7.jpg" },
    { songName: "Heroes Tonight", filePath: "/songs/8.mp3", coverPath: "cover/8.jpg" },
    { songName: "Feel Good", filePath: "/songs/9.mp3", coverPath: "cover/9.jpg" },
    { songName: "My heart", filePath: "/songs/10.mp3", coverPath: "cover/10.jpg" },
];

// Handle play/pause from master control
masterPlay.addEventListener('click', () => {
    if (currentAudio) {
        if (currentAudio.paused) {
            currentAudio.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        } else {
            currentAudio.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        }
    }
});

// Handle individual song play buttons
songItems.forEach((element, i) => {
    element.addEventListener('click', () => {
        if (currentAudio && !currentAudio.paused) {
            currentAudio.pause();
            resetPlayButtons();
        }

        currentSongIndex = i;
        currentAudio = new Audio(songs[i].filePath);
        masterSongName.innerText = songs[i].songName;
        currentAudio.currentTime = 0;
        currentAudio.play();

        element.classList.remove('fa-play-circle');
        element.classList.add('fa-pause-circle');
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

        currentAudio.addEventListener('timeupdate', updateProgress);
    });
});

// Update progress bar
const updateProgress = () => {
    const progress = parseInt((currentAudio.currentTime / currentAudio.duration) * 100);
    myProgressBar.value = progress;
};

// Sync progress bar with song
myProgressBar.addEventListener('change', () => {
    if (currentAudio) {
        currentAudio.currentTime = (myProgressBar.value / 100) * currentAudio.duration;
    }
});

// Reset play button icons
const resetPlayButtons = () => {
    songItems.forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};


