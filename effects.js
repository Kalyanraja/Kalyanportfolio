document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
}); 

const cursor = {
    init() {
        this.dot = document.querySelector('.cursor-dot');
        this.dotOutline = document.querySelector('.cursor-dot-outline');
        this.setPosition({ clientX: 0, clientY: 0 });
        this.bindEvents();
    },

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => this.setPosition(e));
        });
        document.addEventListener('mouseenter', () => this.show());
        document.addEventListener('mouseleave', () => this.hide());
    },

    setPosition(e) {
        this.dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        this.dotOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    },

    show() {
        this.dot.style.opacity = '1';
        this.dotOutline.style.opacity = '1';
    },

    hide() {
        this.dot.style.opacity = '0';
        this.dotOutline.style.opacity = '0';
    }
};

cursor.init(); 