console.log("spotify clone");

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio("/assets/songs/1.mp3");
let masterPlay = document.getElementById("masterplay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("mastersongname");
let songItems = Array.from(document.getElementsByClassName("songitem"));
let songs = [
    { songName: "Warriyo - Mortals [NCS Release]", filePath: "/assets/songs/1.mp3", coverPath: "/images/covers/1.jpg" },
    { songName: "Cielo - Huma-Huma", filePath: "/assets/songs/2.mp3", coverPath: "/images/covers/2.jpg" },
    { songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "/assets/songs/3.mp3", coverPath: "/images/covers/3.jpg" },
    { songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "/assets/songs/4.mp3", coverPath: "/images/covers/4.jpg" },
    { songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "/assets/songs/5.mp3", coverPath: "/images/covers/5.jpg" },
    { songName: "Rabba - Salam-e-Ishq", filePath: "/assets/songs/6.mp3", coverPath: "/images/covers/6.jpg" },
    { songName: "Sakhiyaan - Salam-e-Ishq", filePath: "/assets/songs/7.mp3", coverPath: "/images/covers/7.jpg" },
    { songName: "Bhula Dena - Salam-e-Ishq", filePath: "/assets/songs/8.mp3", coverPath: "/images/covers/8.jpg" },
    { songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "/assets/songs/9.mp3", coverPath: "/images/covers/9.jpg" },
    { songName: "Na Jaana - Salam-e-Ishq", filePath: "/assets/songs/10.mp3", coverPath: "/images/covers/10.jpg" }
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerHTML = songs[i].songName;
})

//add masterplay event handler
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

//update seekbar
audioElement.addEventListener("timeupdate", () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName("songitemplay")).forEach((element) => {
    element.addEventListener("click", (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `/assets/songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

    })
})

document.getElementById("next").addEventListener("click", () => {
    if (songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `/assets/songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `/assets/songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})