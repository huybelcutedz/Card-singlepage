(function () {
    const PLAYLIST = [
        { src: 'audio/track1.mp3', title: 'Yuki Touge - Forza Horizon 6' },
        { src: 'audio/track2.mp3', title: 'Turbo Fire - Forza Horizon 6' },
        { src: 'audio/track3.mp3', title: 'Rebirth - Forza Horizon 6' },
        { src: 'audio/track4.mp3', title: 'Enchanting Stranger - Forza Horizon 6' },
        { src: 'audio/track5.mp3', title: 'Lane 8 - You with Kasablanca' }
    ];

    const audio = document.getElementById('bg-audio');
    const playBtn = document.getElementById('mp-play');
    const prevBtn = document.getElementById('mp-prev');
    const nextBtn = document.getElementById('mp-next');
    const titleEl = document.getElementById('mp-title');
    const bar = document.getElementById('mp-bar');
    const curTimeEl = document.getElementById('mp-current');
    const durTimeEl = document.getElementById('mp-duration');
    const volumeBar = document.getElementById('mp-volume');
    const volumeBtn = document.getElementById('mp-volume-btn');

    if (!audio || !playBtn || !bar || !titleEl) return;

    let index = 4;
    let lastVolume = 0.25;
    let started = false;

    function formatTime(sec) {
        if (!isFinite(sec)) return '0:00';
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    function updatePlayIcon() {
        playBtn.innerHTML = audio.paused ? '<i class="fa-solid fa-play"></i>' : '<i class="fa-solid fa-pause"></i>';
        playBtn.setAttribute('aria-label', audio.paused ? 'Play' : 'Pause');
    }

    function updateVolumeIcon() {
        if (!volumeBtn) return;
        let icon = 'fa-volume-high';
        if (audio.muted || audio.volume === 0) icon = 'fa-volume-xmark';
        else if (audio.volume < 0.5) icon = 'fa-volume-low';
        volumeBtn.innerHTML = `<i class="fa-solid ${icon}"></i>`;
        volumeBtn.setAttribute('aria-label', audio.muted || audio.volume === 0 ? 'Unmute' : 'Mute');
    }

    function updateVolumeFill() {
        if (!volumeBar) return;
        volumeBar.style.backgroundSize = `${audio.volume * 100}% 100%`;
    }

    function loadTrack(i, autoplay) {
        index = (i + PLAYLIST.length) % PLAYLIST.length;
        const track = PLAYLIST[index];
        audio.src = track.src;
        titleEl.textContent = track.title;
        bar.value = 0;
        bar.max = 0;
        bar.style.backgroundSize = '0% 100%';
        curTimeEl.textContent = '0:00';
        durTimeEl.textContent = '0:00';
        if (autoplay) audio.play().catch(() => {});
    }

    playBtn.addEventListener('click', () => {
        if (audio.paused) audio.play().catch(() => {});
        else audio.pause();
    });

    prevBtn?.addEventListener('click', () => loadTrack(index - 1, true));
    nextBtn?.addEventListener('click', () => loadTrack(index + 1, true));

    audio.addEventListener('loadedmetadata', () => {
        bar.max = audio.duration || 0;
        durTimeEl.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
        bar.value = audio.currentTime;
        curTimeEl.textContent = formatTime(audio.currentTime);
        const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
        bar.style.backgroundSize = `${pct}% 100%`;
    });

    bar.addEventListener('input', () => { audio.currentTime = Number(bar.value); });
    audio.addEventListener('ended', () => loadTrack(index + 1, true));
    audio.addEventListener('play', updatePlayIcon);
    audio.addEventListener('pause', updatePlayIcon);

    if (volumeBar) {
        audio.volume = 0.25;
        volumeBar.value = 0.25;
        volumeBar.addEventListener('input', () => {
            audio.muted = false;
            audio.volume = Number(volumeBar.value);
            if (audio.volume > 0) lastVolume = audio.volume;
            updateVolumeIcon();
            updateVolumeFill();
        });
    }

    volumeBtn?.addEventListener('click', () => {
        if (audio.muted || audio.volume === 0) {
            audio.muted = false;
            audio.volume = lastVolume || 0.25;
            if (volumeBar) volumeBar.value = audio.volume;
        } else {
            lastVolume = audio.volume;
            audio.muted = true;
            if (volumeBar) volumeBar.value = 0;
        }
        updateVolumeIcon();
        updateVolumeFill();
    });

    loadTrack(4, true);

    function startMusic() {
        if (started) return;
        audio.play().then(() => {
            started = true;
            updatePlayIcon();
        }).catch(() => {});
    }

    setTimeout(startMusic, 2000);
    document.addEventListener('click', startMusic, { once: true });
    document.addEventListener('touchstart', startMusic, { once: true });

    updatePlayIcon();
    updateVolumeIcon();
    updateVolumeFill();
})();
