let audioElement = new Audio('/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let songItems = Array.from(document.getElementsByClassName('songItemPlay'));
let masterSongName = document.getElementById('masterSongName');

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

// Master play/pause control
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        updatePlayIcons(currentSongIndex);
    } else {
        audioElement.pause();
        resetPlayButtons();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
});

// Handle individual song clicks
songItems.forEach((element, i) => {
    element.addEventListener('click', () => {
        if (currentSongIndex === i && !audioElement.paused) {
            audioElement.pause();
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        } else {
            currentSongIndex = i;
            audioElement.src = songs[i].filePath;
            masterSongName.innerText = songs[i].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            updatePlayIcons(i);
        }
    });
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress || 0;
});

// Seek in song
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});

// Reset all play buttons
const resetPlayButtons = () => {
    songItems.forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Update all icons on play
const updatePlayIcons = (index) => {
    resetPlayButtons();
    songItems[index].classList.remove('fa-play-circle');
    songItems[index].classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
};

// Reset buttons on song end
audioElement.addEventListener('ended', () => {
    resetPlayButtons();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
});


