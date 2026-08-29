// ---------- Mouse-follow spotlight ----------

const glow = document.querySelector('.cursor-glow');

if (glow) {
    document.addEventListener('mousemove', (e) => {
        glow.style.setProperty('--mouse-x', `${e.clientX}px`);
        glow.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
}
