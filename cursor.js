const cursor = {
    init() {
        this.cursor = document.querySelector('.cursor-dot');
        this.cursorOutline = document.querySelector('.cursor-dot-outline');
        this.cursorText = document.createElement('div');
        this.cursorText.classList.add('cursor-text');
        document.body.appendChild(this.cursorText);
        
        this.links = document.querySelectorAll('a, button, .hover-effect');
        this.setupCursor();
        this.setupHovers();
    },

    setupCursor() {
        gsap.set([this.cursor, this.cursorOutline, this.cursorText], {
            xPercent: -50,
            yPercent: -50
        });

        window.addEventListener('mousemove', (e) => {
            gsap.to(this.cursor, {
                duration: 0.1,
                x: e.clientX,
                y: e.clientY
            });
            
            gsap.to([this.cursorOutline, this.cursorText], {
                duration: 0.5,
                x: e.clientX,
                y: e.clientY,
                ease: "power2.out"
            });
        });
    },

    setupHovers() {
        this.links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const text = link.dataset.cursorText || 'View';
                this.cursorText.textContent = text;
                gsap.to([this.cursor, this.cursorOutline], {
                    scale: 2,
                    duration: 0.3
                });
                gsap.to(this.cursorText, {
                    opacity: 1,
                    duration: 0.3
                });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to([this.cursor, this.cursorOutline], {
                    scale: 1,
                    duration: 0.3
                });
                gsap.to(this.cursorText, {
                    opacity: 0,
                    duration: 0.3
                });
            });
        });
    }
};

const magneticEffect = (element, strength = 0.5) => {
    const bounds = element.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;

    gsap.to(element, {
        x: (mouseX - centerX) * strength,
        y: (mouseY - centerY) * strength,
        duration: 0.6,
        ease: "power3.out"
    });
};

// Apply to social links and buttons
document.querySelectorAll('.social-link, .btn').forEach(el => {
    el.addEventListener('mousemove', () => magneticEffect(el));
    el.addEventListener('mouseleave', () => {
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)"
        });
    });
}); 