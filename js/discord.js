(function () {
    const button = document.querySelector('.discord-link');
    const usernameEl = document.getElementById('discord-username');
    const hint = document.querySelector('.discord-copy-hint');
    if (!button || !usernameEl) return;

    button.addEventListener('click', async () => {
        const username = usernameEl.textContent.trim();
        try {
            await navigator.clipboard.writeText(username);
        } catch (error) {
            const area = document.createElement('textarea');
            area.value = username;
            document.body.appendChild(area);
            area.select();
            document.execCommand('copy');
            area.remove();
        }

        if (hint) {
            hint.textContent = 'Copied!';
            setTimeout(() => { hint.textContent = 'Click to copy'; }, 1600);
        }
    });
})();
