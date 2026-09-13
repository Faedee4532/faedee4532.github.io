// Shared scripts for all portfolio pages

document.addEventListener('DOMContentLoaded', () => {
    // Contact sparkles
    const CONTACT_EMAIL = "carolinewmigalla@gmail.com";
    const CONTACT_LABEL = "Email:";

    document.getElementById('contactValue').textContent = CONTACT_EMAIL;

    const SPARKLE_COUNT = 8;

    function initSparkleBox(box) {
        let sparkleEls = [];

        function createSparkles() {
            sparkleEls.forEach(el => el.remove());
            sparkleEls = [];
            for (let i = 0; i < SPARKLE_COUNT; i++) {
                const el = document.createElement('span');
                el.className = 'contact-sparkle';
                box.appendChild(el);
                sparkleEls.push(el);
            }
        }

        function randomizeSparkle(el) {
            const boxWidth = box.offsetWidth;
            const boxHeight = box.offsetHeight;
            if (boxWidth === 0 || boxHeight === 0) return;

            const size = 2 + Math.random() * 3;
            const left = Math.random() * (boxWidth - size);
            const top = Math.random() * (boxHeight - size);
            const duration = 2.8 + Math.random() * 2;
            const delay = Math.random() * duration;

            el.style.width = size + 'px';
            el.style.height = size + 'px';
            el.style.left = left + 'px';
            el.style.top = top + 'px';
            el.style.animationDuration = duration + 's';
            el.style.animationDelay = delay + 's';
        }

        function randomizeAllSparkles() {
            sparkleEls.forEach(randomizeSparkle);
        }

        createSparkles();
        randomizeAllSparkles();

        return randomizeAllSparkles;
    }

    const boxes = document.querySelectorAll('.contact-box');
    const resizers = Array.from(boxes).map(initSparkleBox);

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizers.forEach(fn => fn());
        }, 150);
    });
});

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = 'rgba(74, 158, 110, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];
for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    const connectionThreshold = 150;
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < connectionThreshold) {
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(74, 158, 110, 0.4)';
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Status typing effect
const statuses = ['online', 'scanning', 'idle'];
let idx = 0;

setInterval(() => {
    idx = (idx + 1) % statuses.length;
    const el = document.getElementById('statusText');
    const fullText = 'status: ' + statuses[idx];
    el.textContent = '';
    el.style.opacity = '1';
    let charIdx = 0;

    function typeOut() {
        if (charIdx < fullText.length) {
            el.textContent += fullText[charIdx];
            charIdx++;
            setTimeout(typeOut, 100);
        } else {
            el.style.opacity = '1';
        }
    }

    setTimeout(typeOut, 150);
}, 5000);

// --- Theme toggle (all pages) ---
function initThemeToggle() {
    const btn = document.getElementById('themeToggle');
    var icon = document.body.classList.contains('light') ? '\u2600' : '\u263E';
    var label = document.body.classList.contains('light') ? 'Switch to dark theme' : 'Switch to light theme';
    if (btn) {
        btn.textContent = icon;
        btn.setAttribute('aria-label', label);
        btn.title = label;
    }
    if (btn) {
        btn.addEventListener('click', function () {
            var next = document.body.classList.contains('light') ? 'dark' : 'light';
            document.body.className = next;
            try { localStorage.setItem('theme', next); } catch (e) {}
            btn.textContent = next === 'light' ? '\u2600' : '\u263E';
            btn.setAttribute('aria-label', next === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
            btn.title = next === 'light' ? 'Light theme' : 'Dark theme';
        });
    }
}

// --- Writeup search filter (exploit chains; index) ---
function initWriteupSearch() {
    const input = document.getElementById('writeupSearch');
    if (!input) return;
    const cards = Array.from(document.querySelectorAll('#exploits .cards .card'));
    const count = document.getElementById('writeupCount');
    function apply() {
        const q = input.value.trim().toLowerCase();
        var shown = 0;
        cards.forEach(function (card) {
            const hay = (card.getAttribute('data-search') || '').toLowerCase();
            if (q === '' || hay.indexOf(q) !== -1) {
                card.style.display = '';
                shown++;
            } else {
                card.style.display = 'none';
            }
        });
        if (count) {
            count.textContent = q === '' ? '' : (shown === 1 ? '1 match' : shown + ' matches');
        }
    }
    input.addEventListener('input', apply);
}

// --- Skills search filter (index) ---
function initSkillSearch() {
    const input = document.getElementById('skillSearch');
    if (!input) return;
    const count = document.getElementById('skillCount');
    function apply() {
        const q = input.value.trim().toLowerCase();
        const chips = Array.from(document.querySelectorAll('.skill-chip'));
        var shown = 0;
        chips.forEach(function (chip) {
            const label = (chip.textContent || '').toLowerCase();
            if (q === '' || label.indexOf(q) !== -1) {
                chip.style.display = '';
                shown++;
            } else {
                chip.style.display = 'none';
            }
        });
        if (count) {
            count.textContent = q === '' ? '' : (shown === 1 ? '1 match' : shown + ' matches');
        }
    }
    input.addEventListener('input', apply);
}

document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle();
    initWriteupSearch();
    initSkillSearch();
    initReveal();
    initSectionNav();
    initStats();
    initCopyEmail();
    initBackToTop();
});

// --- Scroll reveal (sections / cards / stats) ---
function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    var targets = document.querySelectorAll('.section:not(.hero), .card, .stat');
    targets.forEach(function (t) { t.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    targets.forEach(function (t) { io.observe(t); });
}

// --- Section nav + section-aware progress bar (index) ---
function initSectionNav() {
    var nav = document.getElementById('sectionNav');
    if (!nav) return;
    var fill = document.querySelector('.scroll-progress-fill');
    var ids = ['about', 'stats', 'exploits', 'built', 'infra', 'project', 'skills'];
    var sections = ids.map(function (id) { return document.getElementById(id); });
    var links = Array.from(nav.querySelectorAll('a'));
    var palette = ['#4a9e6e', '#c4a33a', '#3f9ee0', '#d96b4a', '#8f6be0', '#2fb8a8', '#d04a8f'];
    var active = -1;
    function paint(i) {
        if (i === active) return;
        active = i;
        if (fill) fill.style.setProperty('--progress-color', palette[i % palette.length]);
        links.forEach(function (a, k) { a.classList.toggle('active', k === i); });
    }
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var i = sections.indexOf(entry.target);
                    if (i !== -1) paint(i);
                }
            });
        }, { threshold: 0.5 });
        sections.forEach(function (s) { if (s) io.observe(s); });
    }
    function onScroll() {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        if (h <= 0) return;
        if (fill) fill.style.width = Math.max(0, Math.min(100, (window.scrollY / h) * 100)) + '%';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

// --- Stat counters (index) ---
function initStats() {
    if (!document.querySelectorAll('.stat').length) return;
    function runAll() {
        document.querySelectorAll('.stat').forEach(function (s) { animateStat(s); });
    }
    if (!('IntersectionObserver' in window)) { runAll(); return; }
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) { animateStat(entry.target); io.unobserve(entry.target); }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat').forEach(function (s) { io.observe(s); });
}
function animateStat(statEl) {
    var numEl = statEl.querySelector('.number');
    if (!numEl || numEl.dataset.animated) return;
    numEl.dataset.animated = '1';
    var target = parseInt(numEl.textContent, 10) || 0;
    var start = null;
    var duration = 1200;
    function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        numEl.textContent = Math.round(p * target);
        if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

// --- Copy email to clipboard (index) ---
function initCopyEmail() {
    var box = document.querySelector('.contact-text.contact-box');
    var label = document.querySelector('.contact-label');
    if (!box) return;
    box.classList.add('copyable');
    box.addEventListener('click', function () {
        var email = document.getElementById('contactValue') ? document.getElementById('contactValue').textContent : '';
        function flash() {
            if (label) {
                var original = label.textContent;
                label.textContent = 'Copied!';
                label.classList.add('copied');
                setTimeout(function () { label.textContent = original; label.classList.remove('copied'); }, 1500);
            }
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email).then(flash, flash);
        } else {
            fallbackCopy(email, flash);
        }
    });
}
function fallbackCopy(text, done) {
    try {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        done();
    } catch (e) { done(); }
}

// --- Back to top (all pages) ---
function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) {
        btn = document.createElement('button');
        btn.className = 'back-to-top';
        btn.textContent = '\u25B2';
        btn.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(btn);
    }
    function onScroll() {
        if (window.scrollY > window.innerHeight) btn.classList.add('show'); else btn.classList.remove('show');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
