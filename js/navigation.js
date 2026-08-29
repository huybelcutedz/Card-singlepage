(function () {
    const links = document.querySelectorAll('[data-section]');
    const sections = document.querySelectorAll('.content-section');
    if (!links.length || !sections.length) return;

    function showSection(id, updateHash = true) {
        const target = document.getElementById(id) || document.getElementById('about');
        if (!target) return;

        sections.forEach((section) => {
            const active = section === target;
            section.hidden = !active;
            section.classList.toggle('is-active', active);
        });

        links.forEach((link) => {
            if (link.matches('.horizontal-flex a')) {
                link.classList.toggle('active', link.dataset.section === target.id);
            }
        });

        document.title = `Nguyen Quang Huy | ${target.dataset.pageTitle || target.id}`;
        if (updateHash && window.location.hash !== `#${target.id}`) {
            history.pushState(null, '', `#${target.id}`);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            showSection(link.dataset.section);
        });
    });

    window.addEventListener('popstate', () => {
        showSection(window.location.hash.slice(1) || 'about', false);
    });

    showSection(window.location.hash.slice(1) || 'about', false);
})();
