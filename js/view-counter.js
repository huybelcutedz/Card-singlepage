(function () {
    const countEl = document.getElementById('view-count');

    if (!countEl) return;

    const timer = setInterval(() => {
        if (window.goatcounter && window.goatcounter.visit_count) {
            clearInterval(timer);

            window.goatcounter.visit_count({
                append: '#view-count'
            });
        }
    }, 100);
})();
