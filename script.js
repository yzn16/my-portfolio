document.addEventListener('DOMContentLoaded', () => {
    // قائمة الموبايل
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // إغلاق القائمة عند النقر على أي رابط
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // إغلاق القائمة عند التمرير
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && navLinks.classList.contains('active')) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
            lastScrollTop = scrollTop;
        });
    }

    // تفعيل الرابط النشط عند التمرير
    const sections = document.querySelectorAll('section[id]');
    
    function activateNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink?.classList.add('active');
            } else {
                navLink?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', activateNavLink);

    // تأثيرات التمرير السلس
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // تأثيرات الظهور عند التمرير
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .hero-text, .hero-image').forEach(element => {
        observer.observe(element);
    });

    // تحديد عناصر النص البرمجي
    const typingTexts = document.querySelectorAll('.typing-text');
    
    // إنشاء مراقب التمرير لكل سطر على حدة
    const observerTyping = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // التحقق من أن العنصر لم يتم تحريكه من قبل
            if (entry.isIntersecting && !entry.target.classList.contains('has-animated')) {
                // تفعيل التأثير فقط للعنصر المرئي
                animateLine(entry.target);
                // إضافة صنف للإشارة إلى أن هذا السطر تم تحريكه
                entry.target.classList.add('has-animated');
                
                // إعادة تعيين التأثير عند التمرير مرة أخرى
                setTimeout(() => {
                    entry.target.classList.remove('has-animated');
                }, 1000);
            }
        });
    }, {
        threshold: 1.0, // يتم تفعيل فقط عندما يكون العنصر مرئياً بالكامل
        rootMargin: '-10% 0px' // يضيف هامش للتفعيل
    });

    // مراقبة كل سطر من الكود
    typingTexts.forEach(text => {
        observerTyping.observe(text);
        // تخزين النص الأصلي
        const originalHTML = text.innerHTML;
        text.setAttribute('data-original', originalHTML);
        
        // إضافة تأثير المؤشر
        text.classList.add('cursor-effect');
    });

    function animateLine(element) {
        // الحصول على النص الأصلي
        const originalHTML = element.getAttribute('data-original');
        
        // إخفاء النص الحالي
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.innerHTML = '';
            element.style.opacity = '1';
            
            let tempContainer = document.createElement('div');
            tempContainer.innerHTML = originalHTML;
            
            // تقسيم النص إلى أجزاء مع الحفاظ على التنسيق
            let parts = [];
            tempContainer.childNodes.forEach(node => {
                if (node.nodeType === 3) { // نص عادي
                    parts.push(...node.textContent.split(''));
                } else { // عنصر HTML
                    parts.push(node.outerHTML);
                }
            });
            
            // إعادة كتابة النص مع التنسيق
            let index = 0;
            const writeText = setInterval(() => {
                if (index < parts.length) {
                    element.innerHTML += parts[index];
                    index++;
                } else {
                    clearInterval(writeText);
                    element.classList.add('typing-complete');
                }
            }, 30); // سرعة الكتابة
        }, 200);
    }

    // تفعيل التأثير الأولي للأسطر المرئية
    typingTexts.forEach(text => {
        if (isElementInViewport(text)) {
            animateLine(text);
            text.classList.add('has-animated');
        }
    });

    // تفعيل تأثير الكتابة في الهيدر
    const typewriterElements = document.querySelectorAll('.typewriter span');
    typewriterElements.forEach(element => {
        element.style.width = '0';
    });

    // مراقبة أسطر الكود عند التمرير
    const codeLines = document.querySelectorAll('.code-line');
    const observerCode = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // تأخير ظهور كل سطر
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, entry.target.dataset.index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    // إضافة مؤشر الترتيب لكل سطر
    codeLines.forEach((line, index) => {
        line.dataset.index = index;
        observerCode.observe(line);
    });
});

// دالة مساعدة للتحقق مما إذا كان العنصر مرئياً
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
