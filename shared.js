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
