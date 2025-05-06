// DOM elementleri
const cursor = document.querySelector('.cursor-follower');
const hero = document.querySelector('.hero');
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const loadingScreen = document.querySelector('.loading-screen');
const loadingProgress = document.querySelector('.loading-progress');

// Vanta.js efekti
let vantaEffect = null;

// Sayfa yüklenme animasyonu
document.addEventListener('DOMContentLoaded', () => {
    // Loading ekranı animasyonu
    const loadingDuration = 2000; // 2 saniye
    let progress = 0;
    const interval = 20;
    const step = 100 / (loadingDuration / interval);

    const progressInterval = setInterval(() => {
        progress += step;
        loadingProgress.style.width = `${Math.min(progress, 100)}%`;

        if (progress >= 100) {
            clearInterval(progressInterval);
            loadingScreen.classList.add('hidden');

            // Sayfa içeriği yüklendikten sonra scroll pozisyonunu başa al
            window.scrollTo(0, 0);

            // AOS benzeri etki için data-aos attribute'u olan elementleri kontrol et
            handleScrollAnimations();

            // Vanta.js efektini başlat
            initVantaEffect();
        }
    }, interval);
});

// Vanta.js Halo efektini başlat
function initVantaEffect() {
    if (typeof VANTA !== 'undefined') {
        // Hero alanı için Vanta efekti
        if (document.getElementById('vanta-bg')) {
            vantaEffect = VANTA.HALO({
                el: "#vanta-bg",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 700.00,
                minWidth: 200.00,
                backgroundColor: 0x1B1F3B,
                amplitudeFactor: 4.00,     // Daha da arttırıldı - çok daha dağınık görünüm
                xOffset: 0.10,             // Hafif kenara kaydırıldı - asimetrik görünüm için
                yOffset: 0.10,             // Hafif kenara kaydırıldı - asimetrik görünüm için
                size: 3.00,                // Daha da arttırıldı - daha büyük efekt alanı
                baseColor: 0x1B1F3B,
                ringColor: 0x00E6FE,
                waveHeight: 1.5,           // Daha da arttırıldı - çok daha yüksek dalgalar
                waveSpeed: 1.2,            // Ayarlandı - doğal görünüm için
                mouseEase: false,          // Daha ani mouse hareketleri
                mouseFactor: 2.0,          // Arttırıldı - mouse hareketine çok daha duyarlı
                scaleMobile: 1.0,          // Mobil cihazlarda ölçeklendirme
                speed: 4.0                 // Genel hızı artırma
            });
        }
    }
}

// Custom Cursor
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;

        if (!cursor.classList.contains('active')) {
            setTimeout(() => {
                cursor.classList.add('active');
            }, 300);
        }
    });

    document.addEventListener('mouseout', () => {
        cursor.classList.remove('active');
    });

    // Hover efekti için tüm linklere ve butonlara event ekle
    const hoverElements = document.querySelectorAll('a, button, .tag, .service-card, .project-card, .feature-card');

    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// Scroll Olayları
window.addEventListener('scroll', () => {
    // Navbar için scroll class'ı ekleme
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll animasyonlarını kontrol et
    handleScrollAnimations();
});

// Window yeniden boyutlandırıldığında Vanta efektini yenile
window.addEventListener('resize', () => {
    if (vantaEffect) {
        vantaEffect.resize();
    }
});

// Mobil Menu Toggle
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Menü linklerine tıklayınca menüyü kapat
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// Scroll Animasyonları (AOS Benzeri)
function handleScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Element görünür olduğunda css class'ı ekle
        if (elementTop < windowHeight * 0.9) {
            element.classList.add('aos-animate');
        }
    });
}

// Müşteri Logoları için Infinite Scroll
function setupInfiniteSlider() {
    const clientLogos = document.querySelector('.client-logos');

    if (clientLogos) {
        // Logolar toplamda 8 tane, bunları 16'ya çıkarmak için clone'layalım
        const originalLogos = clientLogos.innerHTML;
        clientLogos.innerHTML = originalLogos + originalLogos;
    }
}

setupInfiniteSlider();

// Formlara focus/blur eventleri ekle
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.parentElement.classList.remove('focused');
        }
    });
});

// FAQ Toggle
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.addEventListener('click', () => {
                // Tüm diğer açık FAQ itemlarını kapat
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.height = '0';
                    }
                });

                // Tıklanan item'ı aç veya kapat
                const isActive = item.classList.contains('active');

                if (isActive) {
                    item.classList.remove('active');
                    answer.style.height = '0';
                } else {
                    item.classList.add('active');
                    answer.style.height = answer.scrollHeight + 'px';
                }
            });
        }
    });
});
