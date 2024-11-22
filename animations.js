import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollSmoother from 'gsap/ScrollSmoother';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

class AnimationController {
    constructor() {
        this.smoother = ScrollSmoother.create({
            smooth: 1.5,
            effects: true,
            smoothTouch: 0.1
        });
        
        this.initHeroAnimations();
        this.initProjectCards();
        this.initSectionAnimations();
        this.initSkillTags();
    }

    initHeroAnimations() {
        const heroText = new SplitType('.hero-title', { types: 'chars' });
        const heroPara = new SplitType('.hero-text', { types: 'lines' });
        
        gsap.from(heroText.chars, {
            opacity: 0,
            y: 50,
            rotateX: -90,
            stagger: 0.02,
            duration: 1,
            ease: "back.out(1.7)"
        });

        gsap.from(heroPara.lines, {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.8,
            delay: 0.5
        });
    }

    initProjectCards() {
        gsap.utils.toArray('.project-card').forEach(card => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom-=100",
                    end: "top center",
                    scrub: 1
                }
            });

            tl.from(card, {
                y: 100,
                opacity: 0,
                rotation: 5,
                scale: 0.9,
                transformOrigin: "center center"
            });

            // 3D hover effect
            card.addEventListener('mousemove', this.handle3DHover);
            card.addEventListener('mouseleave', this.handle3DReset);
        });
    }

    handle3DHover(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        gsap.to(card, {
            rotationY: 20 * (x - 0.5),
            rotationX: -20 * (y - 0.5),
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000
        });
    }

    handle3DReset(e) {
        gsap.to(e.currentTarget, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    }

    initSectionAnimations() {
        gsap.utils.toArray('.section').forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "top 50%",
                    scrub: 1
                }
            });
        });
    }

    initSkillTags() {
        const tags = gsap.utils.toArray('.skill-tag');
        tags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                gsap.to(tag, {
                    y: -10,
                    rotation: gsap.utils.random(-5, 5),
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            });

            tag.addEventListener('mouseleave', () => {
                gsap.to(tag, {
                    y: 0,
                    rotation: 0,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cursor.init();
    loadingScreen.init();
    const animationController = new AnimationController();
}); 