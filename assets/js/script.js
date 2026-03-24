import { projects } from './data.js';

// --- 1. INITIALIZING ELEMENTS ---
const gallery = document.getElementById('project-gallery');
const filterBtns = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDesc = document.getElementById('lightbox-description');
const contentArea = document.querySelector('.lightbox-content');
const closeBtn = document.querySelector('.close-lightbox');
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');


// --- 2. NAVIGATION LOGIC ---
function showSection(targetId, updateHistory = true) {
    let sectionExists = false;
    
    // Process Instagram Embeds jika masuk ke section journal
    if (targetId === 'journal' && window.instgrm) {
        window.instgrm.Embeds.process();
    }

    // Fade-out semua section
    sections.forEach(sec => {
        sec.style.opacity = "0";
        sec.style.transform = "translateY(10px)";
        setTimeout(() => {
            sec.classList.remove('active');
            sec.style.display = "none";
        }, 300); 
    });

    // Validasi target ID, default ke home
    sections.forEach(sec => { if (sec.id === targetId) sectionExists = true; });
    const finalTargetId = sectionExists ? targetId : 'home';

    // Fade-in target section
    setTimeout(() => {
        const activeSec = document.getElementById(finalTargetId);
        if (activeSec) {
            activeSec.style.display = "block";
            activeSec.offsetHeight; // Trigger reflow
            activeSec.classList.add('active');
            activeSec.style.opacity = "1";
            activeSec.style.transform = "translateY(0)";
        }
    }, 350);

    // Update Nav UI
    navItems.forEach(nav => {
        nav.classList.remove('active-nav');
        if (nav.getAttribute('href') === `#${finalTargetId}`) nav.classList.add('active-nav');
    });

    if (updateHistory) history.pushState({ sectionId: finalTargetId }, "", `#${finalTargetId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1) || 'home';
    showSection(hash, false);
});

// --- 3. GALLERY & FILTER LOGIC ---
function displayProjects(category) {
    if (!gallery) return;
    gallery.innerHTML = "";
    const filtered = category === 'all' ? projects : projects.filter(p => p.category === category);
    
    filtered.forEach((p, index) => {
        const div = document.createElement('div');
        div.className = 'project-item';
        div.style.animationDelay = `${index * 0.05}s`; 
        
        // --- MODIFIKASI LAZY LOADING DISINI ---
        div.innerHTML = `
            <img src="${p.img}" alt="${p.title}" loading="lazy" class="lazy-img">
            ${p.link ? '<div class="play-icon"><i class="fas fa-play"></i></div>' : ''}
        `;

        // Logika Fade-in saat gambar selesai dimuat
        const img = div.querySelector('.lazy-img');
        img.onload = () => img.classList.add('loaded');
        // ---------------------------------------

        div.onclick = () => openLightbox(p);
        gallery.appendChild(div);
    });
}

// --- 4. FEATURED PROJECTS (HOME PAGE) ---
function displayFeaturedProjects() {
    const featuredContainer = document.getElementById('featured-grid');
    if (!featuredContainer) return;

    const featuredList = ["Vol. 1", "Vol. 2", "Vol. 3"]
        .map(vol => projects.find(p => p.category === vol))
        .filter(item => item !== undefined);

    featuredContainer.innerHTML = "";
    
    featuredList.forEach((p, index) => {
        const div = document.createElement('div');
        div.className = `featured-item reveal delay-${index + 1}`;
        
        // --- MODIFIKASI LAZY LOADING DISINI ---
        div.innerHTML = `
            <img src="${p.img}" alt="${p.title}" loading="lazy" class="lazy-img">
            <span class="vol-tag">${p.category}</span>
        `;

        const img = div.querySelector('.lazy-img');
        img.onload = () => img.classList.add('loaded');
        // ---------------------------------------
        
        div.onclick = () => {
            showSection('projects');
            displayProjects(p.category);
            filterBtns.forEach(btn => {
                btn.classList.remove('active');
                if(btn.dataset.filter === p.category) btn.classList.add('active');
            });
        };
        featuredContainer.appendChild(div);
    });
}

// --- 5. SCROLL REVEAL & TYPEWRITER ---
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(el => observer.observe(el));
}

const phrases = ["Exploring Sounds.", "Amplifying Voices.", "Connecting Melodies.", "Music Collectives.", "Defining Frequencies."];
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function type() {
    const textElement = document.getElementById('typewriter');
    if (!textElement) return;
    const currentPhrase = phrases[phraseIndex];
    
    textElement.innerText = isDeleting 
        ? currentPhrase.substring(0, charIndex - 1) 
        : currentPhrase.substring(0, charIndex + 1);

    isDeleting ? charIndex-- : charIndex++;

    let typeSpeed = isDeleting ? 50 : 150;
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
}

// --- 6. LIGHTBOX ---
function openLightbox(item) {
    lightbox.style.display = 'flex';
    lightboxTitle.innerText = item.title;
    lightboxDesc.innerText = item.desc;

    if (item.type === "youtube") {
        contentArea.innerHTML = `<div class="video-container"><iframe src="https://www.youtube.com/embed/${item.link}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`;
    } 
    else if (item.type === "instagram") {
        contentArea.innerHTML = `<div class="instagram-placeholder"><img src="${item.img}" class="insta-bg-blur"><div class="insta-overlay"><i class="fab fa-instagram"></i><p>Konten tersedia di Instagram</p><a href="${item.link}" target="_blank" class="btn-insta-ext">Tonton</a></div></div>`;
    }
    else if (item.type === "soundcloud") {
        const scUrl = encodeURIComponent(item.link);
        contentArea.innerHTML = `
            <div class="soundcloud-wrapper">
                <iframe 
                    width="100%" 
                    height="450" 
                    scrolling="no" 
                    frameborder="no" 
                    allow="autoplay; encrypted-media" 
                    src="https://w.soundcloud.com/player/?url=${scUrl}&color=%23ffffff&auto_play=true&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=false&visual=true">
                </iframe>
            </div>`;
    } 
    else {
        contentArea.innerHTML = `<img src="${item.img}" alt="${item.title}" style="width:100%; height:auto; border-radius:12px 12px 0 0;">`;
    }
}

function closeLightbox() {
    lightbox.style.display = 'none';
    contentArea.innerHTML = ""; 
}

if (closeBtn) closeBtn.onclick = closeLightbox;
lightbox.onclick = (e) => { if (e.target === lightbox) closeLightbox(); };

// --- 7. UNIFIED CUSTOM CURSOR ---
function initCustomCursor() {
    const dot = document.querySelector(".cursor-dot");
    const outline = document.querySelector(".cursor-outline");
    if (!dot || !outline) return;

    let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function animate() {
        posX += (mouseX - posX) * 0.15;
        posY += (mouseY - posY) * 0.15;
        outline.style.transform = `translate(${posX}px, ${posY}px)`;
        requestAnimationFrame(animate);
    }
    animate();

    const targets = document.querySelectorAll("a, button, .project-item, .filter-btn, .nav-item, .logo-container, .widget-toggle");
    targets.forEach(el => {
        el.addEventListener("mouseenter", () => {
            outline.style.width = "70px";
            outline.style.height = "70px";
            outline.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            outline.style.borderColor = "transparent";
            dot.style.opacity = "0";
        });
        el.addEventListener("mouseleave", () => {
            outline.style.width = "30px";
            outline.style.height = "30px";
            outline.style.backgroundColor = "transparent";
            outline.style.borderColor = "rgba(255, 255, 255, 0.5)";
            dot.style.opacity = "1";
        });
    });
}

// --- 8. WIDGETS & TOOLS ---
function initMusicWidget() {
    const widget = document.querySelector('.music-widget');
    const toggle = document.querySelector('.widget-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        widget.classList.toggle('active');
        const icon = toggle.querySelector('i');
        icon.className = widget.classList.contains('active') ? 'fas fa-times' : 'fas fa-music';
    });
}

function initCountdown() {
    const targetDate = new Date("April 18, 2026 19:00:00").getTime();
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        const update = (id, val) => {
            const el = document.getElementById(id);
            if(el) el.innerText = val < 10 ? "0" + val : val;
        };
        update("days", d); update("hours", h); update("minutes", m); update("seconds", s);

        if (distance < 0) {
            clearInterval(timer);
            const container = document.querySelector(".upcoming-session");
            if(container) container.innerHTML = "<h3>Session Vol. 3 is Live</h3>";
        }
    }, 1000);
}

// --- 9. INITIAL LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    const currentHash = window.location.hash.substring(1) || 'home';
    showSection(currentHash, false);
    displayProjects('all');
    displayFeaturedProjects();
    type();
    initCustomCursor();
    initMusicWidget();
    initCountdown();
    setTimeout(initScrollReveal, 150); 
});