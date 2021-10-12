const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PLAYER_STORAGE_KEY = 'FIRST_PLAYER';
const playerText = $('.player__header');
const nextBtn = $('.button__next');
const prevBtn = $('.button__prev');
const playPause = $('.button__play-pause');
const disc = $('.player__disc');
const audio = $('#audio');
const progressArea = $('.progress-area');
const playlist = $('.playlist');
const progressBar = $('.progress-bar');
const songDuration = $('.song-duration');
const shuffleBtn = $('.button__shuffle');
const repeatBtn = $('.button__repeat');
const togglePlay = $('.button__play-pause');

var count = 0;
var arrayTemp = [];
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            id: 1,
            name: 'Em không hiểu',
            singer: 'Changg',
            path: '/musics/Em Không Hiểu.mp3',
            image: '/img/emkhonghieu.jpg',
        },
        {
            id: 2,
            name: 'Em ơi cứ vui',
            singer: 'Touliver',
            path: '/musics/Em ơi cứ vui.mp3',
            image: '/img/emoicuvui.jpg',
        },
        {
            id: 3,
            name: 'Kiss Me More',
            singer: 'Doja Cat & SZA',
            path: '/musics/Kiss Me More.mp3',
            image: '/img/kissmemore.jpg',
        },
        {
            id: 4,
            name: 'Lỡ say bye là bye',
            singer: 'Lemese & Changg',
            path: '/musics/Lỡ say bye là bye.mp3',
            image: '/img/losayblb.jpg',
        },
        {
            id: 5,
            name: 'Playah',
            singer: 'Soobin Hoàng Sơn',
            path: '/musics/Playah.mp3',
            image: '/img/playah.jpg',
        },
        {
            id: 6,
            name: 'Stay',
            singer: 'The Kid LAROI',
            path: '/musics/Stay.mp3',
            image: '/img/stay.jpg',
        },
        {
            id: 7,
            name: 'Thức giấc',
            singer: 'Da LAB',
            path: '/musics/Thức giấc.mp3',
            image: '/img/thucgiac.jpg',
        },
        {
            id: 8,
            name: 'WAP',
            singer: 'Cardi B',
            path: '/musics/WAP.mp3',
            image: '/img/WAP.jpg',
        },
        {
            id: 9,
            name: 'Wizard',
            singer: 'Martin Garrix',
            path: '/musics/Wizard.mp3',
            image: '/img/wizard.jpg',
        },
        {
            id: 10,
            name: 'あの夢をなぞって',
            singer: 'Yoasobi',
            path: '/musics/あの夢をなぞって.mp3',
            image: '/img/anoyume.jpg',
        },
    ],
    setConfig(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
	<div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${
                song.id
            }">
			<div class="song-info">
				<img src=${song.image} alt="" class="song-img">
				<div class="song-info__text">
					<h3>${song.name}</h3>
					<span>${song.singer}</span>
				</div>
			</div>
			<div class="song-setting">
				<ion-icon name="ellipsis-horizontal"></ion-icon>
			</div>
		</div>`;
        });
        $('.playlist').innerHTML = htmls.join('');
        // Render COnfig
        shuffleBtn.classList.toggle('active-button', app.isRandom);
        repeatBtn.classList.toggle('active-button', app.isRepeat);
    },
    defineProperties() {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },
    handleEvent() {
        // spinning Disc animation
        const rotatingAnimation = disc.animate(
            [
                {
                    transform: 'rotate(360deg)',
                },
            ],
            {
                duration: 16000, //16s duration
                iterations: Infinity,
            }
        );

        rotatingAnimation.pause();

        function handleNextSong() {
            if (!app.isRandom) {
                audio.load();
                const allSongs = $$('.song');
                allSongs.forEach(function (songNode, index) {
                    if (songNode.dataset.index - 1 == app.currentIndex) {
                        songNode.classList.toggle('active');
                    }
                });
                rotatingAnimation.cancel();
                app.nextSong();
                audio.play();
                allSongs.forEach(function (songNode, index) {
                    if (songNode.dataset.index - 1 == app.currentIndex) {
                        songNode.classList.toggle('active');
                    }
                });
            } else {
                const allSongs = $$('.song');
                allSongs.forEach(function (songNode, index) {
                    if (songNode.dataset.index - 1 == app.currentIndex) {
                        songNode.classList.toggle('active');
                    }
                });
                audio.load();
                rotatingAnimation.cancel();
                app.playRandomSong();
                audio.play();
                allSongs.forEach(function (songNode, index) {
                    if (songNode.dataset.index - 1 == app.currentIndex) {
                        songNode.classList.toggle('active');
                    }
                });
            }
        }
        // DISC SIZE manupulate
        //  Play button onlcik
        togglePlay.onclick = () => {
            if (!app.isPlaying) {
                audio.play();
            } else {
                audio.pause();
            }
        };
        // AUdio Play/Pause
        audio.onplay = () => {
            rotatingAnimation.play();
            playPause.classList.add('playing');
            app.isPlaying = true;
        };
        audio.onpause = () => {
            rotatingAnimation.pause();
            playPause.classList.remove('playing');
            app.isPlaying = false;
        };
        // Update Song Progress

        audio.ontimeupdate = () => {
            // currentTimeupdate
            let currentMinutes = Math.floor(audio.currentTime / 60);
            let currentSeconds = Math.floor(
                audio.currentTime - currentMinutes * 60
            );
            currentSeconds =
                currentSeconds < 10 ? '0' + currentSeconds : currentSeconds;

            // songTImePreview
            let songMinutes = Math.floor(audio.duration / 60);
            let songSeconds = Math.floor(audio.duration - songMinutes * 60);
            songSeconds = songSeconds < 10 ? '0' + songSeconds : songSeconds;
            if (songMinutes && songSeconds) {
                songDuration.innerHTML = `
				<span>${currentMinutes}:${currentSeconds}</span>
				<span>${songMinutes}:${songSeconds}</span>
			`;
                let progress = Math.floor(
                    (audio.currentTime / audio.duration) * 100
                );
                progressBar.style.width = progress + '%';
            }
        };
        // Skip Progress audio
        progressArea.addEventListener('mousedown', (e) => {
            let progressWidth = progressArea.clientWidth;
            let clickedOffSetX = e.offsetX;
            let songDuration = audio.duration;
            audio.currentTime = (clickedOffSetX / progressWidth) * songDuration;
        });
        // Shuffle
        shuffleBtn.onclick = () => {
            app.isRandom = !app.isRandom;
            app.setConfig('isRandom', app.isRandom);
            shuffleBtn.classList.toggle('active-button', app.isRandom);
        };
        // Reapeat on end
        repeatBtn.onclick = () => {
            app.isRepeat = !app.isRepeat;
            app.setConfig('isRepeat', app.isRepeat);
            repeatBtn.classList.toggle('active-button', app.isRepeat);
        };
        // Next song
        nextBtn.onclick = () => {
            handleNextSong();
        };
        // Prev song
        prevBtn.onclick = () => {
            const allSongs = $$('.song');
            allSongs.forEach(function (songNode, index) {
                if (songNode.dataset.index - 1 == app.currentIndex) {
                    songNode.classList.toggle('active');
                }
            });
            audio.load();
            rotatingAnimation.cancel();
            app.prevSong();
            audio.play();
            allSongs.forEach(function (songNode, index) {
                if (songNode.dataset.index - 1 == app.currentIndex) {
                    songNode.classList.toggle('active');
                }
            });
        };
        // Handle end of song
        audio.onended = () => {
            if (app.isRepeat) {
                audio.play();
            } else {
                handleNextSong();
            }
        };

        // songOnclick
        playlist.onclick = (e) => {
            const songNode = e.target.closest('.song:not(.active)');
            if (songNode && !e.target.closest('.song-setting')) {
                const allSongs = $$('.song');
                allSongs.forEach(function (songNode, index) {
                    if (songNode.dataset.index - 1 == app.currentIndex) {
                        songNode.classList.toggle('active');
                    }
                });
                app.currentIndex = songNode.dataset.index - 1;
                audio.load();
                songNode.classList.toggle('active');
                rotatingAnimation.cancel();
                app.loadCurrentSong();
                audio.play();
            }
            if (e.target.closest('.song-setting')) {
                console.log(e.target.closest('.song-setting'));
            }
        };
    },
    loadCurrentSong() {
        //this.currentSong is a getter not a value
        playerText.innerHTML = `
		<span>Now streaming</span>
					<h3>${this.currentSong.name}</h3>
					<p>${this.currentSong.singer}</p>
		`;
        disc.style['background-image'] = `url("${this.currentSong.image}")`;
        audio.src = this.currentSong.path;
    },
    loadConfiguration() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    nextSong() {
        this.currentIndex++;
        if (this.currentIndex > this.songs.length - 1) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    shuffleSong() {
        let randomIndex = Math.floor(Math.random() * this.songs.length);
        while (this.currentIndex == randomIndex) {
            randomIndex = Math.floor(Math.random() * this.songs.length);
        }
        this.currentIndex = randomIndex;
        this.loadCurrentSong();
    },
    playRandomSong() {
        let newIndex = Math.floor(Math.random() * this.songs.length);
        if (count > 0) {
            while (
                arrayTemp.includes(newIndex) ||
                newIndex == this.currentIndex
            ) {
                newIndex = Math.floor(Math.random() * this.songs.length);
            }
        }
        // Test
        arrayTemp[count] = newIndex;
        if (count == this.songs.length - 1) {
            arrayTemp = [];
            count = -1;
        }
        count++;

        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    start: function () {
        // Assign configs to app
        this.loadConfiguration();
        // define Properties
        this.defineProperties();
        // listen and respond to events
        this.handleEvent();
        // LoadCurrentSong
        this.loadCurrentSong();
        // Render UI
        this.render();
    },
};
app.start();
