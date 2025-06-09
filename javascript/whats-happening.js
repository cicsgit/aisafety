// Function to safely parse date without timezone issues
function parseDate(dateString) {
    if (!dateString) return null;
    // Parse date as local date to avoid timezone shifts
    const parts = dateString.split('-');
    if (parts.length === 3) {
        // Create date as YYYY-MM-DD in local timezone
        return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    }
    return new Date(dateString);
}

// Function to render news items from whats-happening.yaml
async function renderLatestNews() {
    const container = document.getElementById('news-container');
    if (!container) return;

    // Show loading indicator
    container.innerHTML = `
        <div class="loading-indicator">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading news articles...</p>
        </div>
    `;

    try {
        // Load the YAML data
        const data = await loadYamlData('whats-happening.yaml');
        if (!data || !data.latest_news) {
            container.innerHTML = '<p>No news available at this time.</p>';
            // Hide the view more button if no data
            const viewMoreContainer = document.querySelector('#news .view-more-container');
            if (viewMoreContainer) viewMoreContainer.style.display = 'none';
            return;
        }

        // Store all news items and sort by date (most recent first)
        const allNews = data.latest_news.slice().sort((a, b) => {
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            if (!dateA && !dateB) return 0;
            if (!dateA) return 1;
            if (!dateB) return -1;
            return dateB - dateA; // Most recent first
        });

        const maxInitialItems = 6;
        const shouldShowViewMore = allNews.length > maxInitialItems;
        
        // Get the view more button
        const viewMoreBtn = document.getElementById('news-view-more-btn');
        const viewMoreContainer = viewMoreBtn?.parentElement;
        
        // State management
        let isExpanded = false;

        function renderNewsItems(newsItems) {
            container.innerHTML = '';
            
            // Create card grid container
            const cardGrid = document.createElement('div');
            cardGrid.className = 'card-grid';
            
            // Render news items
            newsItems.forEach(newsItem => {
                const newsCard = document.createElement('div');
                newsCard.className = 'content-card';

                const date = parseDate(newsItem.date);

                newsCard.innerHTML = `
                    <div class="card-image">
                        <img src="${newsItem.image}" alt="${newsItem.title}" loading="lazy">
                        <div class="card-date">
                            <span class="month">${date ? date.toLocaleDateString('en-US', { month: 'short' }) : ''}</span>
                            <span class="day">${date ? date.getDate() : ''}</span>
                        </div>
                    </div>
                    <div class="card-content">
                        <h3>${newsItem.title}</h3>
                        <p>${newsItem.description}</p>
                        <a href="${newsItem.link}" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                    </div>
                `;

                cardGrid.appendChild(newsCard);
            });
            
            container.appendChild(cardGrid);
        }

        function updateViewMoreButton() {
            if (!viewMoreBtn || !viewMoreContainer) return;
            
            if (shouldShowViewMore) {
                viewMoreContainer.style.display = 'block';
                viewMoreBtn.classList.remove('hidden');
                
                if (isExpanded) {
                    viewMoreBtn.textContent = 'View Less News';
                    viewMoreBtn.onclick = () => {
                        isExpanded = false;
                        renderNewsItems(allNews.slice(0, maxInitialItems));
                        updateViewMoreButton();
                        // Scroll back to top of section
                        document.getElementById('news').scrollIntoView({ behavior: 'smooth' });
                    };
                } else {
                    viewMoreBtn.textContent = 'View All News';
                    viewMoreBtn.onclick = () => {
                        isExpanded = true;
                        renderNewsItems(allNews);
                        updateViewMoreButton();
                    };
                }
            } else {
                viewMoreContainer.style.display = 'none';
            }
        }

        // Initial render
        const initialNews = shouldShowViewMore ? allNews.slice(0, maxInitialItems) : allNews;
        renderNewsItems(initialNews);
        updateViewMoreButton();

    } catch (error) {
        console.error('Error rendering news:', error);
        container.innerHTML = '<p>Failed to load news. Please try again later.</p>';
        // Hide the view more button on error
        const viewMoreContainer = document.querySelector('#news .view-more-container');
        if (viewMoreContainer) viewMoreContainer.style.display = 'none';
    }
}

// Function to render upcoming events
async function renderUpcomingEvents() {
    const container = document.getElementById('events-container');
    if (!container) return;

    // Show loading indicator
    container.innerHTML = `
        <div class="loading-indicator">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading events...</p>
        </div>
    `;

    try {
        // Load the YAML data
        const data = await loadYamlData('whats-happening.yaml');
        if (!data || !data.upcoming_events) {
            container.innerHTML = '<p>No events available at this time.</p>';
            // Hide the view more button if no data
            const viewMoreContainer = document.querySelector('#events .view-more-container');
            if (viewMoreContainer) viewMoreContainer.style.display = 'none';
            return;
        }

        // Store all events and sort by date (most recent first)
        const allEvents = data.upcoming_events.slice().sort((a, b) => {
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            if (!dateA && !dateB) return 0;
            if (!dateA) return 1;
            if (!dateB) return -1;
            return dateB - dateA; // Most recent first
        });

        const maxInitialItems = 6;
        const shouldShowViewMore = allEvents.length > maxInitialItems;
        
        // Get the view more button
        const viewMoreBtn = document.getElementById('events-view-more-btn');
        const viewMoreContainer = viewMoreBtn?.parentElement;
        
        // State management
        let isExpanded = false;

        function renderEventItems(eventItems) {
            container.innerHTML = '';
            
            // Create card grid container
            const cardGrid = document.createElement('div');
            cardGrid.className = 'card-grid';
            
            // Render event items
            eventItems.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.className = 'content-card event-card';

                const date = parseDate(event.date);

                eventCard.innerHTML = `
                    <div class="card-image">
                        <img src="${event.image}" alt="${event.title}" loading="lazy">
                        <div class="card-date">
                            <span class="month">${date ? date.toLocaleDateString('en-US', { month: 'short' }) : ''}</span>
                            <span class="day">${date ? date.getDate() : ''}</span>
                        </div>
                    </div>
                    <div class="card-content">
                        <h3>${event.title}</h3>
                        ${event.time ? `
                        <div class="event-time">
                            <i class="fas fa-clock"></i>
                            ${event.time}
                        </div>` : ''}
                        ${event.location ? `
                        <div class="event-location">
                            <i class="fas fa-map-marker-alt"></i>
                            ${event.location}
                        </div>` : ''}
                        <p>${event.description}</p>
                        <a href="${event.link}" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                    </div>
                `;

                cardGrid.appendChild(eventCard);
            });
            
            container.appendChild(cardGrid);
        }

        function updateViewMoreButton() {
            if (!viewMoreBtn || !viewMoreContainer) return;
            
            if (shouldShowViewMore) {
                viewMoreContainer.style.display = 'block';
                viewMoreBtn.classList.remove('hidden');
                
                if (isExpanded) {
                    viewMoreBtn.textContent = 'View Less Events';
                    viewMoreBtn.onclick = () => {
                        isExpanded = false;
                        renderEventItems(allEvents.slice(0, maxInitialItems));
                        updateViewMoreButton();
                        // Scroll back to top of section
                        document.getElementById('events').scrollIntoView({ behavior: 'smooth' });
                    };
                } else {
                    viewMoreBtn.textContent = 'View All Events';
                    viewMoreBtn.onclick = () => {
                        isExpanded = true;
                        renderEventItems(allEvents);
                        updateViewMoreButton();
                    };
                }
            } else {
                viewMoreContainer.style.display = 'none';
            }
        }

        // Initial render
        const initialEvents = shouldShowViewMore ? allEvents.slice(0, maxInitialItems) : allEvents;
        renderEventItems(initialEvents);
        updateViewMoreButton();

    } catch (error) {
        console.error('Error rendering events:', error);
        container.innerHTML = '<p>Failed to load events. Please try again later.</p>';
        // Hide the view more button on error
        const viewMoreContainer = document.querySelector('#events .view-more-container');
        if (viewMoreContainer) viewMoreContainer.style.display = 'none';
    }
}

// Function to highlight active sidebar item based on scroll position
function handleScrollSpy() {
    const sections = document.querySelectorAll('.content-section');
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    let currentSectionId = '';
    let maxVisibility = 0;
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        
        let visibleHeight = 0;
        if (rect.top <= 0 && rect.bottom >= 0) {
            visibleHeight = Math.min(rect.bottom, viewportHeight);
        } else if (rect.top >= 0 && rect.top < viewportHeight) {
            visibleHeight = Math.min(viewportHeight - rect.top, rect.height);
        }
        
        const visibilityPercentage = (visibleHeight / rect.height) * 100;
        
        if (visibilityPercentage > maxVisibility) {
            maxVisibility = visibilityPercentage;
            currentSectionId = section.id;
        }
    });
    
    if (currentSectionId) {
        sidebarItems.forEach(item => {
            const sectionId = item.getAttribute('data-section');
            if (sectionId === currentSectionId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
}

// Initialize whats-happening page functionality
function initWhatsHappeningPage() {
    // Load all content sections
    renderLatestNews();
    renderUpcomingEvents();

    // Set up sidebar item click handlers
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Set up scroll spy for sidebar
    window.addEventListener('scroll', handleScrollSpy);
    setTimeout(handleScrollSpy, 100);
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initWhatsHappeningPage);
