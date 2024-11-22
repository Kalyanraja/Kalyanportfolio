document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix-background');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "78XCFBGOlS6keY1Bil";
    const fontSize = 16;
    const columns = canvas.width/fontSize;

    const rainDrops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';

        for(let i = 0; i < rainDrops.length; i++) {
            const text = matrix.charAt(Math.floor(Math.random() * matrix.length));
            ctx.fillText(text, i*fontSize, rainDrops[i]*fontSize);
            
            if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    setInterval(draw, 30);
});

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// Scroll to Top
const scrollBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Tab functionality for experience section
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to clicked button and corresponding panel
        button.classList.add('active');
        tabPanels[index].classList.add('active');
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.25
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Custom Cursor
const cursor = {
    dot: document.querySelector('.cursor-dot'),
    dotOutline: document.querySelector('.cursor-dot-outline'),
    cursorVisible: true,
    cursorEnlarged: false,
    
    endX: window.innerWidth / 2,
    endY: window.innerHeight / 2,
    
    init: function() {
        document.addEventListener('mousemove', (e) => {
            this.endX = e.pageX;
            this.endY = e.pageY;
            this.dot.style.top = this.endY + 'px';
            this.dot.style.left = this.endX + 'px';
        });
        
        this.setupEventListeners();
        this.animateDotOutline();
    },
    
    setupEventListeners: function() {
        document.querySelectorAll('a, button, .hover-effect').forEach(el => {
            el.addEventListener('mouseover', () => {
                this.cursorEnlarged = true;
                this.toggleCursorSize();
            });
            el.addEventListener('mouseout', () => {
                this.cursorEnlarged = false;
                this.toggleCursorSize();
            });
        });
    },
    
    toggleCursorSize: function() {
        if (this.cursorEnlarged) {
            this.dotOutline.style.transform = 'translate(-50%, -50%) scale(2.5)';
            this.dot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        } else {
            this.dotOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            this.dot.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    },
    
    animateDotOutline: function() {
        let x = 0;
        let y = 0;
        
        const animate = () => {
            x += (this.endX - x) * 0.08;
            y += (this.endY - y) * 0.08;
            
            this.dotOutline.style.top = y + 'px';
            this.dotOutline.style.left = x + 'px';
            
            requestAnimationFrame(animate);
        };
        animate();
    }
};

// Noise Effect
const noise = () => {
    let canvas, ctx;
    
    const createNoise = () => {
        const idata = ctx.createImageData(canvas.width, canvas.height);
        const buffer32 = new Uint32Array(idata.data.buffer);
        const len = buffer32.length;

        for(let i = 0; i < len; i++) {
            if(Math.random() < 0.5) {
                buffer32[i] = 0xff000000;
            }
        }
        
        ctx.putImageData(idata, 0, 0);
    };
    
    const init = () => {
        canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9998';
        document.getElementById('noise').appendChild(canvas);
        
        ctx = canvas.getContext('2d');
        
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();
        
        const loop = () => {
            createNoise();
            requestAnimationFrame(loop);
        };
        loop();
    };
    
    init();
};

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    cursor.init();
    noise();
    
    // Magnetic Buttons
    document.querySelectorAll('.magnetic-button').forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const position = button.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });
        
        button.addEventListener('mouseout', () => {
            button.style.transform = 'translate(0px, 0px)';
        });
    });
});

// Form animations
const formGroups = document.querySelectorAll('.form-group');

formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');

    input.addEventListener('focus', () => {
        group.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            group.classList.remove('focused');
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.innerHTML = '<span class="loading"></span>';
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    submitBtn.innerHTML = 'Message Sent!';
    contactForm.reset();
    
    setTimeout(() => {
        submitBtn.innerHTML = 'Send Message';
    }, 3000);
});
