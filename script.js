// for Aneeba - sab khuch yahin hai, pure page ka logic
// notes pehle likhe the, phir songs ka best-part timings add kiye

// ==== NOTES DATA ====
const notes = [
    {
        emoji: "⭐",
        heading: "My Favorite Person",
        body: "You are my favorite person in this whole world, and I don't say it enough. Before you, I never knew what it felt like to have someone who just <em>gets</em> me. Someone who makes even boring days feel special."
    },
    {
        emoji: "❤️",
        heading: "One Of A Kind",
        body: "There was <strong>nobody like you before</strong>, and there will never be anyone like you after. You are one of a kind, and I hope you never forget that. The world is a better place just because you're in it."
    },
    {
        emoji: "💖",
        heading: "You're Enough",
        body: "I don't need anyone else when I have you. You're more than enough. More than I ever hoped for. More than I ever dreamed of. You're everything."
    },
    {
        emoji: "💕",
        heading: "Better Person",
        body: "You make me want to be a better person. Not gonna lie, that's all you. The way you care, the way you love, the way you show up — it inspires me every single day."
    },
    {
        emoji: "💫",
        heading: "Always Close",
        body: "No matter how far apart we are, you're always right here with me. In my thoughts, in my heart, in every song I hear. Distance means nothing when someone means everything."
    },
    {
        emoji: "💗",
        heading: "Thank You",
        body: "Thank you for being you. Thank you for your patience, your kindness, your understanding. The world doesn't know how lucky it is to have you, but I do."
    },
    {
        emoji: "🌙",
        heading: "Late Night Thoughts",
        body: "Even at 3 AM when I can't sleep, you're the person I think about. Not because I'm worried, but because you're my comfort. You're my peace. You're my home."
    },
    {
        emoji: "💘",
        heading: "Promise",
        body: "I'm not going anywhere — through every good day, every bad day, every laugh, every silence. I'm here. I'm staying. <strong>Forever.</strong> That's a promise."
    }
];

let currentNoteIndex = 0;

// particles (floating hearts) banate hain
function createParticles() {
    const container = document.getElementById('particles');
    const shapes = ['❤️','💖','✨','⭐','💕','💗'];
    for (let i = 0; i < 35; i++) {
        const p = document.createElement('span');
        p.classList.add('particle');
        p.textContent = shapes[Math.floor(Math.random()*shapes.length)];
        p.style.left = Math.random()*100 + '%';
        p.style.fontSize = (Math.random()*12+8) + 'px';
        p.style.animationDuration = (Math.random()*10+8) + 's';
        p.style.animationDelay = (Math.random()*15) + 's';
        container.appendChild(p);
    }
}

// page switch karne ka logic
let activePage = 'home';

function goTo(page) {
    if (page === activePage) return;

    // Hide all screens
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

    // Show target
    const target = document.getElementById('screen-' + page);
    if (target) {
        target.classList.add('active');
        target.classList.add('showing');
        setTimeout(() => target.classList.remove('showing'), 650);
    }

    // Update nav
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.mob-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.nav-btn[data-page="${page}"]`)?.classList.add('active');
    document.querySelector(`.mob-btn[data-page="${page}"]`)?.classList.add('active');

    activePage = page;

    // Populate notes list if going to notes page
    if (page === 'notes') populateNotesList();

    // Scroll to top
    if (target) target.scrollTop = 0;
}

// note kholna / band karna
function openNote(index) {
    currentNoteIndex = index;
    renderNote();

    const popup = document.getElementById('notePopup');
    popup.classList.add('show');

    // Haptic-like animation
    const inner = popup.querySelector('.note-popup-inner');
    inner.style.transform = 'scale(0.9)';
    setTimeout(() => inner.style.transform = '', 100);
}

function closeNote() {
    document.getElementById('notePopup').classList.remove('show');
}

function renderNote() {
    const note = notes[currentNoteIndex];
    const content = document.getElementById('notePopupContent');
    content.innerHTML = `
        <span class="note-emoji">${note.emoji}</span>
        <h2 class="note-heading">${note.heading}</h2>
        <p class="note-body">${note.body}</p>
    `;
    document.getElementById('noteCounter').textContent = `${currentNoteIndex+1} / ${notes.length}`;

    document.getElementById('prevNote').style.visibility = currentNoteIndex === 0 ? 'hidden' : 'visible';
    document.getElementById('nextNote').style.visibility = currentNoteIndex === notes.length-1 ? 'hidden' : 'visible';
}

function prevNoteFn() {
    if (currentNoteIndex > 0) {
        currentNoteIndex--;
        renderNote();
    }
}

function nextNoteFn() {
    if (currentNoteIndex < notes.length - 1) {
        currentNoteIndex++;
        renderNote();
    }
}

// Close popup on Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNote();
    if (e.key === 'ArrowLeft') prevNoteFn();
    if (e.key === 'ArrowRight') nextNoteFn();
});

// notes ki list yahan ban rahi hai
function populateNotesList() {
    const list = document.getElementById('notesList');
    if (list.children.length > 0) return; // Already populated

    notes.forEach((note, i) => {
        const div = document.createElement('div');
        div.classList.add('note-item');
        div.onclick = () => openNote(i);
        div.innerHTML = `
            <span class="ni-emoji">${note.emoji}</span>
            <span class="ni-title">${note.heading}</span>
            <span class="ni-preview">${note.body.replace(/<[^>]*>/g,'').substring(0,60)}...</span>
        `;
        list.appendChild(div);
    });
}

// gallery photo upload
function loadPhoto(input, slotId) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const slot = document.getElementById(slotId);
        slot.classList.remove('empty');
        slot.classList.add('filled');

        const placeholder = slot.querySelector('.slot-placeholder');
        if (placeholder) placeholder.style.display = 'none';

        input.style.display = 'none';

        const oldImg = slot.querySelector('img');
        if (oldImg) oldImg.remove();

        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = "Our memory";
        slot.prepend(img);
    };
    reader.readAsDataURL(file);
}

// song player - best part timing +2/-2 se adjust hota hai
let currentPlayingCard = null;

function getStart(src, defaultSec) {
    const saved = localStorage.getItem('songStart_' + src);
    return saved !== null ? parseInt(saved, 10) : defaultSec;
}

function setStart(src, sec) {
    localStorage.setItem('songStart_' + src, String(sec));
}

function playSong(card, src, startSec) {
    // If same card clicked, toggle off
    if (currentPlayingCard === card) {
        card.classList.remove('playing');
        card.querySelector('.song-card-player').innerHTML = '';
        currentPlayingCard = null;
        return;
    }

    // Stop previous
    if (currentPlayingCard) {
        currentPlayingCard.classList.remove('playing');
        currentPlayingCard.querySelector('.song-card-player').innerHTML = '';
    }

    // Play new
    card.classList.add('playing');
    const playerDiv = card.querySelector('.song-card-player');
    let sec = getStart(src, startSec);
    let audio = null;

    function buildPlayer(autoplay) {
        playerDiv.innerHTML = `
            <audio controls ${autoplay ? 'autoplay' : ''} preload="metadata"></audio>
            <div class="song-start-controls">
                <button class="song-start-btn" data-step="-2">−2s</button>
                <span class="song-start-label">Best part @ ${sec}s</span>
                <button class="song-start-btn" data-step="2">+2s</button>
            </div>`;
        audio = playerDiv.querySelector('audio');
        audio.src = src;
        audio.addEventListener('loadedmetadata', () => {
            try { audio.currentTime = sec; } catch (e) {}
        });

        playerDiv.querySelectorAll('.song-start-btn').forEach(btn => {
            btn.addEventListener('click', (ev) => {
                ev.stopPropagation();
                sec = Math.max(0, sec + parseInt(btn.dataset.step, 10));
                setStart(src, sec);
                playerDiv.querySelector('.song-start-label').textContent = `Best part @ ${sec}s`;
                try { audio.currentTime = sec; } catch (e) {}
            });
        });

        const p = audio.play();
        if (p && p.catch) {
            p.catch(() => {
                if (autoplay) {
                    audio.remove();
                    buildPlayer(false);
                }
            });
        }
    }

    buildPlayer(true);
    currentPlayingCard = card;
}

// loading screen - minimum 6 second dikhta hai
function hideLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    loader.classList.add('hide');
    setTimeout(() => loader.remove(), 750);
}

let loaderPageReady = false;
let loaderMinTimeUp = false;

function maybeHideLoader() {
    if (loaderPageReady && loaderMinTimeUp) hideLoader();
}

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    populateNotesList();

    // tab hide hota hai jab page bhi load ho jaye aur 4 sec min guzre hon
    loaderPageReady = document.readyState === 'complete';
    window.addEventListener('load', () => { loaderPageReady = true; maybeHideLoader(); });
    setTimeout(() => { loaderMinTimeUp = true; maybeHideLoader(); }, 6000);

    // Animate home in on first paint
    const home = document.getElementById('screen-home');
    if (home) {
        home.classList.add('showing');
        setTimeout(() => home.classList.remove('showing'), 650);
    }
});
