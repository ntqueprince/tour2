/* =========================================
   MUSSOORIE TRAVEL GUIDE — JS
   Smooth scroll | Expand cards | Reveal on scroll
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- 1. NAVBAR SCROLL EFFECT ---------- */
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // back to top button
        if (window.scrollY > 400) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    /* ---------- 2. MOBILE MENU TOGGLE ---------- */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click (mobile)
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target) &&
            navMenu.classList.contains('active')
        ) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    /* ---------- 3. SMOOTH SCROLL (anchor offset) ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 70; // navbar height
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* ---------- 4. EXPAND/COLLAPSE TIMELINE CARDS ---------- */
    const timelineCards = document.querySelectorAll('.timeline-card');

    timelineCards.forEach(card => {
        const head = card.querySelector('.timeline-head');
        const btn = card.querySelector('.expand-btn');

        const toggle = (e) => {
            e.stopPropagation();
            card.classList.toggle('active');
        };

        head.addEventListener('click', toggle);
        btn.addEventListener('click', toggle);
    });

    /* ---------- 5. REVEAL ON SCROLL (Intersection Observer) ---------- */
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                // Stagger effect for grouped cards
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, idx * 60);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));

    /* ---------- 6. BACK TO TOP CLICK ---------- */
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ---------- 7. DOWNLOAD PLAN (DUMMY) ---------- */
    const downloadBtn = document.getElementById('downloadBtn');
    const toast = document.getElementById('toast');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            // Quick button-press animation
            downloadBtn.style.transform = 'scale(0.95)';
            setTimeout(() => downloadBtn.style.transform = '', 150);

            // Generate a simple text plan & trigger download
            const plan = `
==============================================
  2-DAY BUDGET TRIP TO MUSSOORIE
  From Delhi via Dehradun
==============================================

💰 TOTAL BUDGET: ₹2500 – ₹3000 / person
📍 DISTANCE:     ~290 km
⏱️  TRAVEL TIME:  7-9 hours one-way
📅 BEST TIME:    March – June

----------------------------------------------
DAY 0 (Thursday Night)
----------------------------------------------
11:00 PM → Reach Kashmiri Gate Bus Stand
11:30 PM → Board govt bus to Dehradun

----------------------------------------------
DAY 1 (Friday)
----------------------------------------------
6:00  AM → Reach Dehradun (ISBT)
6:30  AM → Shared taxi to Mussoorie
8:00  AM → Hotel check-in
10:00 AM → Explore Mall Road
2:00  PM → Visit Kempty Falls
7:00  PM → Night walk + street food

----------------------------------------------
DAY 2 (Saturday)
----------------------------------------------
5:30  AM → Sunrise at Gun Hill
9:00  AM → Breakfast
12:00 PM → Hotel checkout
1:00  PM → Return to Dehradun
4:00  PM → Bus back to Delhi

----------------------------------------------
BUDGET BREAKDOWN
----------------------------------------------
Bus (round trip)    ₹1200
Stay (1 night)      ₹500
Food                ₹700
Local travel        ₹300
Entry tickets       ₹200
TOTAL              ₹2500 – ₹3000

----------------------------------------------
TIPS
----------------------------------------------
• Carry light luggage
• Share taxi to save money
• Avoid expensive cafes
• Book night bus to save time
• Carry warm clothes (even in summer)
• Keep ₹2000 cash handy

Happy Journey! ⛰️🌄
      `.trim();

            const blob = new Blob([plan], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Mussoorie-Trip-Plan.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            // Show toast
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2400);
        });
    }

    /* ---------- 8. BUTTON CLICK RIPPLE EFFECT ---------- */
    document.querySelectorAll('.btn, .map-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            this.style.transform = 'scale(0.96)';
            setTimeout(() => this.style.transform = '', 150);
        });
    });

    /* ---------- 9. ACTIVE NAV LINK ON SCROLL ---------- */
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 100;
            if (window.scrollY >= top) {
                current = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + current) {
                link.style.color = 'var(--accent-dark)';
            }
        });
    });

    /* ---------- 10. WELCOME LOG ---------- */
    console.log('%c⛰️ Welcome to Mussoorie Travel Guide!', 'font-size:18px;font-weight:bold;color:#2d6a4f;');
    console.log('%cHappy Journey! 🚌🌄', 'font-size:13px;color:#e76f51;');
});
