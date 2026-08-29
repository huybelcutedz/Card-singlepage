// ---------- Theme picker ----------

const themeOptions = document.querySelectorAll('.theme-option');

function applyTheme(option) {
    if (!option) return;

    const color = option.dataset.color;
    const colorLight = option.dataset.colorLight;

    if (!color || !colorLight) return;

    document.documentElement.style.setProperty('--green', color);
    document.documentElement.style.setProperty('--green-light', colorLight);
    document.documentElement.style.setProperty(
        '--accent-gradient',
        `linear-gradient(135deg, ${color}, ${colorLight})`
    );

    themeOptions.forEach((item) => {
        item.classList.remove('active');
    });

    option.classList.add('active');
}

themeOptions.forEach((option) => {
    option.addEventListener('click', () => applyTheme(option));
});
