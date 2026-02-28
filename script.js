const timeline = document.getElementById('timeline');
const yearDisplay = document.getElementById('year-display');
const searchInput = document.getElementById('search-input');

const START_YEAR = 1951;
const END_YEAR = new Date().getFullYear();

//searchInput.max = END_YEAR;   //uncomment to automate the year limit

//Timeline generation
function initTimeline() {
    const fragment = document.createDocumentFragment();
    
    for (let year = START_YEAR; year <= END_YEAR; year++) {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.dataset.year = year;

        const img = document.createElement('img');
        img.src = `img/${year}.png`;
        img.alt = `Logo ${year}`;
        img.loading = "lazy";

        item.appendChild(img);
        fragment.appendChild(item);
    }
    
    timeline.appendChild(fragment);
}

initTimeline();

//Update while scrolling
const observerOptions = {
    root: timeline,
    rootMargin: '0px -50% 0px -50%',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            yearDisplay.textContent = entry.target.dataset.year;
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
});

//Research with automatic centering
searchInput.addEventListener('input', (e) => {
    const val = e.target.value;
    if (val.length === 4) {
        const targetYear = parseInt(val, 10);
        if (targetYear >= START_YEAR && targetYear <= END_YEAR) {
            const targetElement = document.querySelector(`[data-year="${targetYear}"]`);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center',
                    block: 'nearest'
                });
            }
        }
    }
});