document.addEventListener('DOMContentLoaded', () => {
    initializeMobileMenu();
    initializeSectionHighlight();
});

function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const menuLinks = document.querySelectorAll('.menu-link');
    const overlay = document.querySelector('.menu-overlay');
    const body = document.body;

    if (!menuToggle || !mobileMenu || !overlay) return;

    // فتح القائمة
    menuToggle.addEventListener('click', () => {
        toggleMenu(true);
    });

    // إغلاق القائمة
    closeMenu?.addEventListener('click', () => {
        toggleMenu(false);
    });

    overlay.addEventListener('click', () => {
        toggleMenu(false);
    });

    // إغلاق القائمة عند النقر على الروابط
    menuLinks.forEach(link => {
        if (!link.classList.contains('contact-link')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                toggleMenu(false);
                
                // إزالة الصنف active من جميع الروابط
                menuLinks.forEach(l => l.classList.remove('active'));
                // إضافة الصنف active للرابط المنقور
                link.classList.add('active');

                // التمرير إلى القسم
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    setTimeout(() => {
                        const offsetTop = targetSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }, 300);
                }
            });
        }
    });

    function toggleMenu(show) {
        menuToggle.classList.toggle('active', show);
        mobileMenu.classList.toggle('active', show);
        overlay.classList.toggle('active', show);
        body.style.overflow = show ? 'hidden' : '';
    }
}

function initializeSectionHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const menuLinks = document.querySelectorAll('.menu-link[href^="#"]');
    
    if (sections.length) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY + 200;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    const currentId = section.getAttribute('id');
                    menuLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${currentId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }
}
