// 1. Ստեղծում ենք աուդիո օբյեկտը և գտնում հիմնական տարրերը
const audio = new Audio();
const mainPlayBtn = document.querySelector('.main-play');
const playerTitle = document.querySelector('.current-song h4');
const playerArtist = document.querySelector('.current-song p');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('duration-time');

// 2. Ֆունկցիա բոլոր երգերի համար
function initSongs() {
    const songItems = document.querySelectorAll('.song-item');

    songItems.forEach(item => {
        item.onclick = function() {
            const src = this.getAttribute('data-src');
            const title = this.getAttribute('data-title');
            const artist = this.getAttribute('data-artist');

            // Եթե սեղմել ենք նույն երգի վրա
            if (audio.src.includes(src) && audio.src !== "") {
                togglePlay();
            } else {
                // Եթե նոր երգ է
                audio.src = src;
                playerTitle.innerText = title;
                playerArtist.innerText = artist;
                audio.play();
                updateUI(true);
            }
        };
    });
}

// 3. Play/Pause կառավարում
function togglePlay() {
    if (audio.paused) {
        audio.play();
        updateUI(true);
    } else {
        audio.pause();
        updateUI(false);
    }
}

function updateUI(isPlaying) {
    mainPlayBtn.innerText = isPlaying ? '⏸' : '▶';
}

mainPlayBtn.onclick = togglePlay;

// 4. Ձողի (Progress Bar) և ժամանակի թարմացում
audio.ontimeupdate = function() {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = percent;
        currentTimeEl.innerText = formatTime(audio.currentTime);
        durationTimeEl.innerText = formatTime(audio.duration);
    }
};

// 5. Երգը առաջ/հետ տանելը ձողով
progressBar.oninput = function() {
    const time = (this.value * audio.duration) / 100;
    audio.currentTime = time;
};

// 6. Ձայնի կարգավորում
volumeBar.oninput = function() {
    audio.volume = this.value / 100;
};

// 7. Ժամանակի ֆորմատավորում (00:00 տեսքի)
function formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

// Երբ երգն ավարտվում է
audio.onended = () => updateUI(false);

// Միացնում ենք երգերի լսողը
initSongs();