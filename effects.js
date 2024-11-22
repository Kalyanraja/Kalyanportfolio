// Custom cursor effect
const cursor = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-dot-outline');

window.addEventListener('mousemove', (e) => {
    cursor.style.opacity = '1';
    cursorOutline.style.opacity = '1';
    
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

window.addEventListener('mouseout', () => {
    cursor.style.opacity = '0';
    cursorOutline.style.opacity = '0';
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

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach((section) => {
    observer.observe(section);
});

// Typing effect for hero section
const text = "Hello, I'm Kalyan Raja";
let index = 0;

function typeWriter() {
    if (index < text.length) {
        document.querySelector('.hero-content h1').textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}

// Particle background effect
const canvas = document.createElement('canvas');
canvas.classList.add('particle-canvas');
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = 'rgba(100, 255, 218, 0.1)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Magnetic effect for social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mousemove', (e) => {
        const bounds = link.getBoundingClientRect();
        const x = e.clientX - bounds.left - bounds.width / 2;
        const y = e.clientY - bounds.top - bounds.height / 2;
        
        link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translate(0, 0)';
    });
});

// Parallax effect for hero section
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX * -0.01);
    const moveY = (e.clientY * -0.01);
    document.querySelector('.hero-content').style.transform = 
        `translate3d(${moveX}px, ${moveY}px, 0)`;
});

// Interactive grid background
const grid = document.createElement('div');
grid.classList.add('grid-background');
document.body.appendChild(grid);

// Typing effect with cursor blink
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.classList.add('typing-done');
        }
    }
    
    type();
}

// Loading screen
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading-screen');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Skill tags animation
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseover', () => {
        tag.style.transform = `translateY(-5px) rotate(${Math.random() * 5 - 2.5}deg)`;
    });
    
    tag.addEventListener('mouseout', () => {
        tag.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// 3D tilt effect for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = 
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

class StarryNight {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.classList.add('starry-night');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.numStars = 150;
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.createStars();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createStars() {
        this.stars = [];
        for (let i = 0; i < this.numStars; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const size = Math.random() * 1.5 + 0.5;
            const speed = Math.random() * 0.5 + 0.1;
            this.stars.push({ x, y, size, speed });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.stars.forEach(star => {
            star.y += star.speed;
            if (star.y > this.canvas.height) {
                star.y = 0;
                star.x = Math.random() * this.canvas.width;
            }
            this.ctx.fillStyle = 'white';
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        requestAnimationFrame(() => this.animate());
    }
}

new StarryNight(); 