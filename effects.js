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

// Noise effect
const noise = document.getElementById('noise');
function createNoise() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 100;
    canvas.height = 100;
    
    const imageData = ctx.createImageData(100, 100);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 255;
    }
    
    ctx.putImageData(imageData, 0, 0);
    noise.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`;
}

createNoise(); 