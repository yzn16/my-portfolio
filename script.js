document.addEventListener('DOMContentLoaded', () => {
    initializeSectionHighlight();
});

function initializeSectionHighlight() {
    const sections = document.querySelectorAll('section[id]');
    
    if (sections.length) {
        window.addEventListener('scroll', () => {
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                const currentScroll = window.pageYOffset;

                if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                    const currentId = section.getAttribute('id');
                    document.querySelector(`[href="#${currentId}"]`)?.classList.add('active');
                } else {
                    const currentId = section.getAttribute('id');
                    document.querySelector(`[href="#${currentId}"]`)?.classList.remove('active');
                }
            });
        });
    }
}
