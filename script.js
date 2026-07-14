
let currentSong = new Audio;
let status = "pause"
let songtime = document.getElementById("song-time")
let duration = document.getElementById("duration")
let heart = document.getElementById("heart")
let bar = document.getElementById("bar")
let bar2 = document.getElementById("bar2")
let seekbar = document.getElementById("seekbar")
let floor = document.getElementById("floor")
let songinfo = document.querySelector(".song-info")
let currfolder;

async function getSongs(folder) {
    let a = await fetch(`/songs/${folder}`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []


    for (let index = 0; index < as.length; index++) {

        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("%5Csongs%5C")[1].slice(0, -4))
        }

    }
    return songs

}


const playmusic = (track, folder) => {
    // var audio = new Audio("/songs/"+track);
    currentSong.src = `/songs/${folder}/` + track
    currentSong.play();
}

async function main() {

    let songs = await getSongs("abhinav")

    let songUL = document.querySelector(".song-list").getElementsByTagName("ul")[0]
    for (const song of songs) {
        console.log(song);

        songUL.innerHTML += `<div class="now" id="box">
                        <i class="fa-solid fa-music" style="color: rgb(255, 255, 255);"></i>
                        <div class="play-info">
                            <div class="sname"><li>${song.replaceAll(`abhinav%5C`, "").replaceAll("%20", " ")}</li></div>
                            <div>Abhinav</div>

                        </div>
                        
                        <button>
                            <i class="fa-solid fa-circle-play" style="color: hsl(141, 76%, 48%);"></i>
                        </button>
                        </div>`
    }



    let songBoxes = document.querySelectorAll(".now");

    songBoxes.forEach(box => {

        box.addEventListener("click", () => {
            status = "play";
            play.innerHTML = '<i class="fa-solid fa-pause"></i>'
            let track = box.querySelector(".sname").innerText + ".mp3";
            songinfo.innerHTML = track.slice(0, -4);

            console.log(track);

            playmusic(track, "abhinav");

        });

    });
}

main()

let cards = document.querySelectorAll(".card")
cards.forEach(card => {
    card.addEventListener("click", () => {
        if (card.closest(".cardcontainer")) {
            status = "play";
            play.innerHTML = '<i class="fa-solid fa-pause"></i>'
            let track = card.querySelector("h2").innerText + ".mp3";
            let title = track.slice(0, -4);
            songinfo.innerHTML = title

            console.log(track);

            playmusic(track, "abhinav");
        }
        // else if(card.closest(".artist-container")){
        //      window.location.href = "artist.html";
        // }
        
    })
})










const playIcon = `
<button class="play-btn">
    <svg viewBox="0 0 24 24">
        <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"/>
    </svg>
</button>
`;

let btn = document.querySelectorAll(".card")
btn.forEach(card => {
    card.insertAdjacentHTML("afterbegin", playIcon);
});



let play = document.getElementById("play")
play.addEventListener("click", () => {
    if (currentSong.paused) {
        currentSong.play()
        play.innerHTML = '<i class="fa-solid fa-pause"></i>'
    }
    else {
        currentSong.pause()
        play.innerHTML = '<i class="fa-solid fa-play"></i>'
    }

})



function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}


function timeline(curr, dur) {
    const start = 28;
    const end = 68;

    const progress = curr / dur;
    const left = start + progress * (end - start);
    return left;
}



function bar2timeline(curr, dur, start, end) {


    const progress = curr / dur;
    const bar2left = start + progress * (end - start);
    return bar2left;
}


function seekSong(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.min(Math.max(clickX / rect.width, 0), 1);

    if (Number.isFinite(currentSong.duration) && currentSong.duration > 0) {
        currentSong.currentTime = percent * currentSong.duration;
    }
}

seekbar.addEventListener("click", seekSong);

currentSong.addEventListener("timeupdate", () => {
    songtime.innerText = (formatTime(currentSong.currentTime));
    duration.innerText = formatTime(currentSong.duration);
    const percent = ((currentSong.currentTime / currentSong.duration) * 100)


    heart.style.left = `${bar2timeline(currentSong.currentTime, currentSong.duration, 28.5, 69.6)}%`

    bar2.style.width = `${bar2timeline(currentSong.currentTime, currentSong.duration, 0, 41)}%`
    // console.log(timeline(currentSong.currentTime,currentSong.duration));
    // console.log(formatTime(currentSong.currentTime))
    // console.log(currentSong.currentTime,currentSong.duration)
})