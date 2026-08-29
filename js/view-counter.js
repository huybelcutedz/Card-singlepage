(function () {
    const countEl = document.getElementById('view-count');

    if (!countEl) return;

    fetch('https://huybelcutedz.goatcounter.com/counter//.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            return response.json();
        })
        .then(data => {
            countEl.textContent = data.count || '0';
        })
        .catch(error => {
            console.error('View counter:', error);
            countEl.textContent = '0';
        });
})();
