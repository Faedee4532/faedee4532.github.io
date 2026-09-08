// skills.js — skill taxonomy + rendering for the skills profile.
// Each skill is a chip. Rooms/projects declare which skills they used.
// The index aggregates the union; each room page shows its own subset.

window.SKILLS = [
    // Enumeration & Recon
    { id: 'nmap', label: 'Nmap', category: 'Enumeration' },
    { id: 'rustscan', label: 'rustscan', category: 'Enumeration' },
    { id: 'ffuf', label: 'ffuf · Vhost & Dir Fuzzing', category: 'Enumeration' },
    { id: 'gobuster', label: 'gobuster', category: 'Enumeration' },
    { id: 'wappalyzer', label: 'Wappalyzer · Stack Recon', category: 'Enumeration' },
    { id: 'smb', label: 'Samba / SMB', category: 'Enumeration' },
    { id: 'ftp', label: 'FTP', category: 'Enumeration' },
    { id: 'apache', label: 'Apache / Web Servers', category: 'Enumeration' },

    // Web Exploitation
    { id: 'cve', label: 'CVE Analysis', category: 'Web Exploitation' },
    { id: 'fileupload', label: 'File Upload RCE', category: 'Web Exploitation' },
    { id: 'csrf', label: 'CSRF Bypass', category: 'Web Exploitation' },
    { id: 'deser', label: 'Insecure Deserialization', category: 'Web Exploitation' },
    { id: 'cmdinj', label: 'OS Command Injection', category: 'Web Exploitation' },

    // Credential Access
    { id: 'mysql', label: 'MySQL / MariaDB', category: 'Credential Access' },
    { id: 'hashcat', label: 'Hashcat', category: 'Credential Access' },
    { id: 'john', label: 'John the Ripper', category: 'Credential Access' },
    { id: 'env', label: '.env / Config Leakage', category: 'Credential Access' },
    { id: 'reuse', label: 'Credential Reuse', category: 'Credential Access' },
    { id: 'md5', label: 'MD5 / Bcrypt Cracking', category: 'Credential Access' },
    { id: 'ssh', label: 'SSH', category: 'Credential Access' },

    // Privilege Escalation
    { id: 'suid', label: 'SUID', category: 'Privilege Escalation' },
    { id: 'cron', label: 'Cron / systemd', category: 'Privilege Escalation' },
    { id: 'pspy', label: 'pspy', category: 'Privilege Escalation' },
    { id: 'lkm', label: 'LKM Rootkit', category: 'Privilege Escalation' },
    { id: 'sudo', label: 'sudo -l', category: 'Privilege Escalation' },
    { id: 'gitplumb', label: 'Git Plumbing (mktree/commit-tree)', category: 'Privilege Escalation' },
    { id: 'bashscript', label: 'bash Script Privesc', category: 'Privilege Escalation' },
    { id: 'pyhijack', label: 'Python Library Hijack', category: 'Privilege Escalation' },

    // Forensics & Steganography
    { id: 'pcap', label: 'pcapng / Wireshark', category: 'Forensics & Steganography' },
    { id: 'upx', label: 'UPX / Binary Packing', category: 'Forensics & Steganography' },
    { id: 'magicbytes', label: 'Magic-byte Forensics', category: 'Forensics & Steganography' },
    { id: 'steghide', label: 'steghide', category: 'Forensics & Steganography' },
    { id: 'rot13', label: 'ROT13 / Encoding', category: 'Forensics & Steganography' },

    // Tooling
    { id: 'burp', label: 'Burp Suite', category: 'Tooling' },
    { id: 'msf', label: 'Metasploit', category: 'Tooling' },
    { id: 'ghidra', label: 'Ghidra', category: 'Tooling' },
    { id: 'commix', label: 'commix', category: 'Tooling' },
    { id: 'searchsploit', label: 'searchsploit', category: 'Tooling' },
    { id: 'docker', label: 'Docker / Compose', category: 'Tooling' },

    // Builder / Home
    { id: 'python', label: 'Python', category: 'Builder / Home' },
    { id: 'esp32', label: 'ESP32 / I2C / DHT', category: 'Builder / Home' },
    { id: 'ollama', label: 'Ollama · Agentic Harness', category: 'Builder / Home' },
    { id: 'arch', label: 'Arch Linux (bare-metal)', category: 'Builder / Home' },
    { id: 'report', label: 'Pen-Test Reporting', category: 'Builder / Home' },
    { id: 'tkinter', label: 'tkinter GUI', category: 'Builder / Home' },
    { id: 'gpu', label: 'GPU Benchmarking / Quantization', category: 'Builder / Home' },
];

window.CATEGORIES = [
    'Enumeration',
    'Web Exploitation',
    'Credential Access',
    'Privilege Escalation',
    'Forensics & Steganography',
    'Tooling',
    'Builder / Home',
];

// Rainbow seed — randomised once per page load, no UI control (seeded, not scattered).
let chipSeed = (Math.floor(Math.random() * 2147483647) || 1);
function rainbowRng() {
    chipSeed = (chipSeed * 1664525 + 1013904223) % 2147483647;
    return chipSeed / 2147483647;
}

const ROT_SPEEDS = [7, 7.5, 8, 8.5, 9, 9.5, 10, 11, 12];
const PULSE_SPEEDS = [2.5, 3, 3.5, 4, 4.5];
const SPARKLE_RAINBOW = 'conic-gradient(from ' + Math.round(Math.random() * 360) + 'deg, #ff0000, #ffaa00, #ffee00, #33ff00, #00ffcc, #0088ff, #6600ff, #ff00aa, #ff0000)';

function skillById(id) {
    return window.SKILLS.find(s => s.id === id) || null;
}

function roomById(id) {
    return (window.ROOMS || []).find(r => r.id === id) || null;
}

// Ambient rainbow sparkles per chip — contact-box style, but rainbow instead of green.
function addAmbientSparkles(chip) {
    const COUNT = 8;
    for (let i = 0; i < COUNT; i++) {
        const s = document.createElement('span');
        s.className = 'skill-sparkle';
        const size = 2 + Math.random() * 3;
        s.style.width = size + 'px';
        s.style.height = size + 'px';
        s.style.background = SPARKLE_RAINBOW;
        s.style.backgroundSize = 'cover';
        s.style.left = (Math.random() * 96) + '%';
        s.style.top = (Math.random() * 96) + '%';
        s.style.animationDuration = (2 + Math.random() * 2) + 's';
        s.style.animationDelay = Math.random() * 2 + 's';
        chip.appendChild(s);
    }
}

function makeChip(skill) {
    const chip = document.createElement('span');
    chip.className = 'skill-chip';
    chip.textContent = skill.label;

    // Seeded per-page rainbow tuning — one random pass, no way to influence it.
    const r1 = rainbowRng(), r2 = rainbowRng(), r3 = rainbowRng();
    chip.style.setProperty('--rainbow-offset', Math.round(r1 * 360) + 'deg');
    chip.style.setProperty('--rainbow-speed', ROT_SPEEDS[Math.floor(r2 * ROT_SPEEDS.length)] + 's');
    chip.style.setProperty('--pulse-speed', PULSE_SPEEDS[Math.floor(r3 * PULSE_SPEEDS.length)] + 's');

    addAmbientSparkles(chip);
    return chip;
}

// Adds the same breathing sparkle on hover that the contact boxes use.
function addChipSparkle(chip) {
    chip.addEventListener('mouseenter', function () {
        const parent = chip;
        for (let i = 0; i < 3; i++) {
            const s = document.createElement('span');
            s.className = 'skill-sparkle';
            const size = 2 + Math.random() * 2;
            parent.appendChild(s);
            s.style.width = size + 'px';
            s.style.height = size + 'px';
            s.style.left = Math.random() * Math.max(1, parent.offsetWidth - size) + 'px';
            s.style.top = Math.random() * Math.max(1, parent.offsetHeight - size) + 'px';
            s.style.animationDuration = (2 + Math.random() * 1.5) + 's';
            s.style.animationDelay = Math.random() * 1.5 + 's';
            if (!parent._sparkles) parent._sparkles = [];
            parent._sparkles.push(s);
        }
    });
    chip.addEventListener('mouseleave', function () {
        if (chip._sparkles) { chip._sparkles.forEach(x => x.remove()); chip._sparkles = []; }
    });
}

// Render a room's own skills as chips (used on each room page).
function renderRoomSkills(container, ids) {
    if (!container) return;
    container.innerHTML = '';
    const set = new Set(ids || []);
    const chips = window.SKILLS.filter(s => set.has(s.id));
    const grid = document.createElement('div');
    grid.className = 'skills-grid';
    chips.forEach(skill => {
        const chip = makeChip(skill);
        addChipSparkle(chip);
        grid.appendChild(chip);
    });
    container.appendChild(grid);
}

// Render the full aggregated skills profile (used on the index page).
function renderSkillsProfile(container) {
    if (!container) return;
    container.innerHTML = '';
    const used = new Set();
    (window.ROOMS || []).forEach(r => (r.skills || []).forEach(id => used.add(id)));
    window.CATEGORIES.forEach(category => {
        const catSkills = window.SKILLS.filter(s => s.category === category && used.has(s.id));
        if (catSkills.length === 0) return;
        const heading = document.createElement('h3');
        heading.className = 'skills-category';
        heading.textContent = category;
        container.appendChild(heading);
        const grid = document.createElement('div');
        grid.className = 'skills-grid';
        catSkills.forEach(skill => {
            const chip = makeChip(skill);
            addChipSparkle(chip);
            grid.appendChild(chip);
        });
        container.appendChild(grid);
    });
}
