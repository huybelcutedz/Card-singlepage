(function () {
    const countEl = document.getElementById('view-count');

    if (!countEl) return;

    fetch('https://huybelcutedz.goatcounter.com/counter//.json')
        .then(response => response.json())
        .then(data => {
            countEl.textContent = data.count || '0';
        })
        .catch(() => {
            countEl.textContent = '0';
        });
})();
