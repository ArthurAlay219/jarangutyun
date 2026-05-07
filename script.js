const audio = new Audio();
const mainPlayBtn = document.querySelector('.main-play');
const playerTitle = document.querySelector('.current-song h4');
const playerArtist = document.querySelector('.current-song p');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('duration-time');
const footerLink = document.getElementById('song-link'); 

function initSongs() {
    const songItems = document.querySelectorAll('.song-item');

    songItems.forEach(item => {
        item.onclick = function() {
            const src = this.getAttribute('data-src');
            const title = this.getAttribute('data-title');
            const artist = this.getAttribute('data-artist');

            // Ստուգում ենք՝ արդյոք նույն երգն է
            if (audio.src.includes(src) && audio.src !== "") {
                togglePlay();
            } else {
                audio.src = src;
                playerTitle.innerText = title;
                playerArtist.innerText = artist;
                
                // Թարմացնում ենք հղումը ֆուտերում
                updateFooterLink(title); 

                audio.play();
                updateUI(true);
            }
        };
    });
}

// Հղումների ավտոմատ թարմացում
function updateFooterLink(title) {
    if (!footerLink) return;

    // Այստեղ ավելացրու միայն այն երգերը, որոնց համար արդեն սարքել ես .html էջ
  const songPages = {
        // 01-10
        "Յարխուշտա": "yarkushta.html",
        "Դլե Յաման": "dleyaman.html",
        "Գնա գնա": "#.html",
        "Մայրիկ շփե": "merig.html",
        "Անդրանիկ Փաշա": "andranik.html",
        "Ելեք հայեր": "eleqhayer.html",
        "Զորանանք": "zorananq.html",
        "Վրեժ": "vrej.html",
        "Տալ-Տալա": "taltala.html",
        "Սասնա երգերի շարան": "sharan.html",

        // 11-20
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

        // 21-30
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

    if (songPages[title]) {
        footerLink.href = songPages[title];
        footerLink.style.cursor = "pointer";
        footerLink.style.opacity = "1";
    } else {
        // Եթե էջը դեռ չկա, հղումը չի աշխատի
        footerLink.href = "#";
        footerLink.style.cursor = "default";
        footerLink.style.opacity = "0.8";
    }
}

// Play/Pause կառավարում
function togglePlay() {
    if (audio.src === "" || !audio.src) return; // Եթե երգ ընտրված չէ
    
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

// Ժամանակի և Progress Bar-ի թարմացում
audio.ontimeupdate = function() {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = percent;
        currentTimeEl.innerText = formatTime(audio.currentTime);
        durationTimeEl.innerText = formatTime(audio.duration);
    }
};

progressBar.oninput = function() {
    const time = (this.value * audio.duration) / 100;
    audio.currentTime = time;
};

volumeBar.oninput = function() {
    audio.volume = this.value / 100;
};

function formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}
let currentImages = [];
let currentIndex = 0;

function openSlider(element) {
    const title = element.getAttribute('data-title');
    const desc = element.getAttribute('data-desc');
    // Ստանում ենք նկարների ցուցակը և սարքում զանգված
    currentImages = element.getAttribute('data-images').split(',');
    currentIndex = 0;

    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerText = desc;
    document.getElementById('total-imgs').innerText = currentImages.length;
    
    updateSlide();
    document.getElementById('lightbox').style.display = 'flex';
}

function updateSlide() {
    const imgElement = document.getElementById('lightbox-img');
    imgElement.src = currentImages[currentIndex];
    document.getElementById('current-idx').innerText = currentIndex + 1;
}

function changeSlide(direction) {
    currentIndex += direction;
    if (currentIndex >= currentImages.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = currentImages.length - 1;
    updateSlide();
}
function openSlider(element) {
    const title = element.getAttribute('data-title');
    const desc = element.getAttribute('data-desc');
    const imagesAttr = element.getAttribute('data-images');
    const storyLink = element.getAttribute('data-link'); // NEW: կարդում է հղումը
    
    if(imagesAttr) {
        currentImages = imagesAttr.split(',');
        currentIndex = 0;
        
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-desc').innerText = desc;
        
        // NEW: Այս տողը կոճակին տալիս է ճիշտ հասցեն
        document.getElementById('modal-link').setAttribute('href', storyLink); 
        
        document.getElementById('total-imgs').innerText = currentImages.length;
        
        updateSlide();
        document.getElementById('lightbox').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

audio.onended = () => updateUI(false);

// Միացնում ենք երգերի լսողը
initSongs();
const filterButtons = document.querySelectorAll('.filter-btn');
const songItems = document.querySelectorAll('.song-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Հեռացնում ենք active կլասը բոլոր կոճակներից և տալիս ենք սեղմվածին
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        songItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-genre') === filterValue) {
                item.style.display = 'flex'; // Ցույց տալ
            } else {
                item.style.display = 'none'; // Թաքցնել
            }
        });
    });
});
function openLightbox(element) {
    const imgUrl = element.querySelector('img').src;
    const title = element.getAttribute('data-title');
    const desc = element.getAttribute('data-desc');
    const url = element.getAttribute('data-url');

    const lightboxImg = document.getElementById('lightbox-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalBtn = document.getElementById('modal-link-btn');

    lightboxImg.src = imgUrl;
    modalTitle.innerText = title;
    modalDesc.innerText = desc;
    
    modalBtn.onclick = function() {
        window.location.href = url;
    };

    document.getElementById('lightbox').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Արգելում ենք էջի սքրոլը, երբ մոդալը բաց է
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto'; // Վերականգնում ենք սքրոլը
}