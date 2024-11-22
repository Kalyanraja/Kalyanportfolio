const initAnimations = () => {
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.3,
        rootMargin: "0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                if (entry.target.classList.contains('skills-section')) {
                    animateSkills();
                }
            }
        });
    }, options);

    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });

    const animateSkills = () => {
        const skills = document.querySelectorAll('.skill-bar');
        skills.forEach(skill => {
            const percentage = skill.getAttribute('data-percentage');
            skill.style.width = percentage + '%';
        });
    };
}; 