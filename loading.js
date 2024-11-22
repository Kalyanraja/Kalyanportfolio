const loadingScreen = {
    init() {
        this.loader = document.querySelector('.loading-screen');
        this.text = this.loader.querySelector('.loading-text');
        this.progress = { value: 0 };
        
        this.animate();
    },

    animate() {
        const tl = gsap.timeline();
        
        tl.to(this.progress, {
            value: 100,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => {
                this.text.textContent = `${Math.round(this.progress.value)}%`;
            }
        })
        .to(this.loader, {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut"
        })
        .from('nav', {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.out"
        }, "-=0.4")
        .from('.hero-content > *', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power4.out"
        }, "-=0.4");
    }
}; 