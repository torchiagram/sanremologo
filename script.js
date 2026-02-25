const timeline = document.getElementById('timeline');
const yearDisplay = document.getElementById('year-display');
const searchInput = document.getElementById('search-input');

const START_YEAR = 1951;
const END_YEAR = 2026;

function initTimeline() {
    for (let year = START_YEAR; year <= END_YEAR; year++) {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.dataset.year = year;

        const img = document.createElement('img');
        img.src = `img/${year}.png`;
        img.alt = `Logo ${year}`;
        img.loading = "lazy";

        item.appendChild(img);
        timeline.appendChild(item);
    }
}

// Aggiorna l'anno in alto durante lo scroll
timeline.addEventListener('scroll', () => {
    const items = document.querySelectorAll('.timeline-item');
    const containerCenter = timeline.scrollLeft + (window.innerWidth / 2);

    items.forEach(item => {
        const center = item.offsetLeft + (item.offsetWidth / 2);
        if (Math.abs(containerCenter - center) < 50) {
            yearDisplay.textContent = item.dataset.year;
        }
    });
});

// Ricerca e scroll automatico
searchInput.addEventListener('input', (e) => {
    const val = e.target.value;
    if (val.length === 4) {
        const targetYear = parseInt(val);
        if (targetYear >= START_YEAR && targetYear <= END_YEAR) {
            const targetElement = document.querySelector(`[data-year="${targetYear}"]`);
            if (targetElement) {
                timeline.scrollTo({
                    left: targetElement.offsetLeft - (window.innerWidth / 2) + (targetElement.offsetWidth / 2),
                    behavior: 'smooth'
                });
            }
        }
    }
});

initTimeline();