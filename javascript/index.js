// Function to render mixed news and events for landing page
async function renderMixedNewsEvents(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Show loading indicator
    container.innerHTML = `
        <div class="loading-indicator">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading news and events...</p>
        </div>
    `;

    const whatsHappeningData = await loadYamlData('whats-happening.yaml');
    if (!whatsHappeningData) {
        console.error('Whats happening data not found or empty');
        container.innerHTML = '<p>No news or events available at this time.</p>';
        return;
    }

    // Get news and events from whats-happening.yaml
    const newsItems = whatsHappeningData.latest_news || [];
    const eventItems = whatsHappeningData.upcoming_events || [];

    // Sort each category by date (newest first)
    newsItems.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(b.date) - new Date(a.date);
    });

    eventItems.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(b.date) - new Date(a.date);
    });

    // Take the 2 latest from each category
    const latestNews = newsItems.slice(0, 2);
    const latestEvents = eventItems.slice(0, 2);

    // Combine and sort by date again
    const combinedItems = [];
    
    // Add news items with category
    latestNews.forEach(item => {
        combinedItems.push({
            ...item,
            category: 'news'
        });
    });
    
    // Add event items with category
    latestEvents.forEach(item => {
        combinedItems.push({
            ...item,
            category: 'event'
        });
    });

    // Sort combined items by date
    combinedItems.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(b.date) - new Date(a.date);
    });

    // Clear existing content
    container.innerHTML = '';

    // Render each item
    combinedItems.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'news-card';
        itemCard.dataset.category = item.category || '';

        const imagePath = getImagePath(item.image, 'content/artifacts/images/aisec_generic.svg');
        
        // Format date nicely
        let formattedDate = '';
        if (item.date) {
            const date = new Date(item.date);
            formattedDate = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        }

        itemCard.innerHTML = `
            <div class="news-image">
                <img src="${imagePath}" alt="${item.title}">
                <div class="news-date">
                    <span class="category-tag ${item.category}">${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
                </div>
            </div>
            <div class="news-content">
                <h3 class="news-title">${item.title}</h3>
                <p class="news-meta">
                    <i class="fas fa-calendar-alt"></i> ${formattedDate}
                    ${item.location ? `<br><i class="fas fa-map-marker-alt"></i> ${item.location}` : ''}
                    ${item.time ? `<br><i class="fas fa-clock"></i> ${item.time}` : ''}
                </p>
                <p class="news-description">${item.description.substring(0, 120)}${item.description.length > 120 ? '...' : ''}</p>
                <a href="${item.link || `whats-happening.html#${item.category === 'news' ? 'news' : 'events'}`}" class="news-link">
                    ${item.category === 'event' ? 'Learn More' : 'Read More'} <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;

        container.appendChild(itemCard);
    });
}



// Function to initialize all dynamic content based on current page
async function initIndexContent() {
    // Detect current page
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPath === 'index.html' || currentPath === '') {
        // Landing page
        if (document.getElementById('news-grid-container')) {
            await renderMixedNewsEvents('news-grid-container');
        }
    }
}

// Ensure initialization happens correctly
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIndexContent);
} else {
    // If DOM is already loaded, run immediately
    initIndexContent().catch(err => {
        console.error('Error initializing dynamic content:', err);
    });
}