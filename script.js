const audio = new Audio();
const mainPlayBtn = document.querySelector('.main-play');
const playerTitle = document.getElementById('footer-song-name'); 
const playerArtist = document.getElementById('footer-artist-name');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('duration-time');
const footerLink = document.getElementById('song-link'); 

const songPages = {
    "Յարխուշտա": "yarkushta.html",
    "Դլե Յաման": "dleyaman.html",
    "Գնա գնա": "gnagna.html",
    "Մայրիկ շփե": "merig.html",
    "Անդրանիկ Փաշա": "andranik.html",
    "Ելեք հայեր": "eleqhayer.html",
    "Զորանանք": "zorananq.html",
    "Վրեժ": "vrej.html",
    "Տալ-Տալա": "taltala.html",
    "Սասնա երգերի շարան": "sharan.html",
    "Մուշ էրգիր": "mushergir.html",
    "Մշեցու զավակ": "msheci.html",
    "Բալու Լազ պարի": "laz.html",
    "Կռունկ": "krunk.html",
    "Կարոտցել եմ ջրերուտ": "jrerut.html",
    "Ջան Ջերյան": "jan.html",
    "Հոյ Նարե": "hoynare.html",
    "Հելե, հելե": "hele.html",
    "Հանինա": "hanina.html",
    "Կը Քելե": "gqele.html",
    "Գետաշեն": "getashen.html",
    "Գարեգին Նժդեհ": "garegin.html",
    "Ֆեդայի": "fedayi.html",
    "Դրոյի հիշատակին": "dro.html",
    "Ցրոնքի կռիվը": "cronq.html",
    "Ծաղկած էրգիր": "caxkac.html",
    "Բրոյի-Բրոյի": "broyi.html",
    "Սասնո բառերի շարան": "barer.html",
    "Վայ Բաբո": "babo.html",
    "Արի սիրուն": "arisirun.html"
};

function initSongs() {
    const songItems = document.querySelectorAll('.song-item');

    songItems.forEach(item => {
        item.onclick = function() {
            const src = this.getAttribute('data-src');
            const title = this.getAttribute('data-title');
            const artist = this.getAttribute('data-artist');

            if (audio.src.includes(src) && audio.src !== "") {
                togglePlay();
            } else {
                audio.src = src;
                playerTitle.innerText = title;
                playerArtist.innerText = artist;
                updateFooterLink(title); 
                audio.play();
                updateUI(true);
            }
        };
    });
}

function updateFooterLink(title) {
    if (!footerLink) return;
    if (songPages[title]) {
        footerLink.href = songPages[title];
        footerLink.style.cursor = "pointer";
        footerLink.style.opacity = "1";
    } else {
        footerLink.href = "#";
        footerLink.style.cursor = "default";
        footerLink.style.opacity = "0.8";
    }
}

function togglePlay() {
    if (!audio.src) return;
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

audio.ontimeupdate = function() {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = percent;
        currentTimeEl.innerText = formatTime(audio.currentTime);
        durationTimeEl.innerText = formatTime(audio.duration);
    }
};

progressBar.oninput = function() {
    audio.currentTime = (this.value * audio.duration) / 100;
};

volumeBar.oninput = function() {
    audio.volume = this.value / 100;
};

function formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

audio.onended = () => updateUI(false);

initSongs();
