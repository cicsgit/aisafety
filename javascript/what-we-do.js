// Function to render mission section from what-we-do.yaml
async function renderMission() {
    const container = document.getElementById('mission-content');
    if (!container) return;

    // Show loading indicator
    container.innerHTML = `
        <div class="loading-indicator">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading mission content...</p>
        </div>
    `;

    try {
        // Load the YAML data from the what-we-do.yaml file
        const data = await loadYamlData('what-we-do.yaml');
        if (!data || !data.mission) {
            container.innerHTML = '<p>Mission content not available at this time.</p>';
            return;
        }

        // Clear loading indicator
        container.innerHTML = '';

        const mission = data.mission;

        // Create mission content with preserved text
        const missionContent = document.createElement('div');
        missionContent.className = 'mission-content';

        missionContent.innerHTML = `
            <div class="mission-text">
                <p class="mission-statement">${mission.statement}</p>
                <p>${mission.description}</p>
                <p>${mission.approach}</p>
                <ul class="mission-goals">
                    ${mission.goals.map(goal => `
                        <li>
                            <i class="${goal.icon}"></i>
                            <span>${goal.text}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div class="mission-image">
                <img src="images/mission-illustration.png" alt="AI Safety Mission Illustration">
            </div>
        `;

        container.appendChild(missionContent);
    } catch (error) {
        console.error('Error rendering mission:', error);
        container.innerHTML = '<p>Failed to load mission content. Please try again later.</p>';
    }
}

// Function to render research areas
async function renderResearch() {
    const container = document.getElementById('research-content');
    if (!container) return;

    // Show loading indicator
    container.innerHTML = `
        <div class="loading-indicator">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading research areas...</p>
        </div>
    `;

    try {
        // Load the YAML data
        const data = await loadYamlData('what-we-do.yaml');
        if (!data || !data.research) {
            container.innerHTML = '<p>Research content not available at this time.</p>';
            return;
        }

        // Clear loading indicator
        container.innerHTML = '';

        const research = data.research;

        // Create research content with horizontal layout
        const researchContent = document.createElement('div');
        researchContent.className = 'research-content';

        researchContent.innerHTML = `
            <div class="research-intro">
                <p>${research.description}</p>
            </div>
            <div class="research-areas">
                ${research.areas.map(area => `
                    <div class="research-area">
                        <div class="research-icon">
                            <i class="${area.icon}"></i>
                        </div>
                        <h3>${area.title}</h3>
                        <p>${area.description}</p>
                        <a href="${area.link}" class="learn-more">Learn More <i class="fas fa-arrow-right"></i></a>
                    </div>
                `).join('')}
            </div>
        `;

        container.appendChild(researchContent);
    } catch (error) {
        console.error('Error rendering research:', error);
        container.innerHTML = '<p>Failed to load research content. Please try again later.</p>';
    }
}

// Function to render featured publications with limit
async function renderFeaturedPublications(containerId, personName, maxFeatured = 5) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Show loading indicator
    container.innerHTML = `
        <div class="loading-indicator">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading featured publications...</p>
        </div>
    `;

    try {
        // Load BibTeX entries
        const entries = await loadBibTeXFile(personName);

        // Clear the container
        container.innerHTML = '';

        if (entries.length === 0) {
            container.innerHTML = `<p class="no-publications">No publications found.</p>`;
            return;
        }

        // Filter for featured publications only
        let featuredEntries = entries.filter(entry => entry.featured === true);
        
        if (featuredEntries.length === 0) {
            container.innerHTML = `<p class="no-publications">No featured publications found.</p>`;
            return;
        }

        // Sort by year (newest first)
        featuredEntries.sort((a, b) => {
            const yearA = parseInt(a.fields.year || '0');
            const yearB = parseInt(b.fields.year || '0');
            return yearB - yearA;
        });

        // Limit to maximum number of featured publications
        featuredEntries = featuredEntries.slice(0, maxFeatured);

        // Create a publication list
        const publicationList = document.createElement('div');
        publicationList.className = 'publications-list';

        // Add publications
        featuredEntries.forEach(entry => {
            const item = document.createElement('div');
            item.className = 'publication-item featured-publication';

            // Set data attributes for filtering using the parsed tags
            if (entry.tags && entry.tags.length > 0) {
                item.dataset.topics = entry.tags.join(',');
            }

            // Format authors
            let authors = entry.fields.author || '';
            authors = authors.replace(/\\myname{([^}]+)}/g, 'Bagdasarian, Eugene');
            authors = authors.replace(/ and /g, ', ');

            // Highlight the person's name
            const nameParts = personName.split(' ');
            const lastName = nameParts[nameParts.length - 1];
            const firstName = nameParts[0];

            authors = authors.replace(new RegExp(`${lastName}(,)?\\s*${firstName}`, 'i'),
                `<strong>${lastName}$1 ${firstName}</strong>`);

            // Common publication info
            const title = entry.fields.title || 'Unknown Title';
            const venue = entry.fields.booktitle || entry.fields.journal || '';
            const publisher = entry.fields.publisher || '';
            const pages = entry.fields.pages || '';
            const doi = entry.fields.doi || '';
            const url = entry.fields.url || '';
            const year = entry.fields.year || '';

            // Prepare tags HTML if there are tags
            let tagsHTML = '';
            if (entry.tags && entry.tags.length > 0) {
                tagsHTML = `
                    <div class="publication-tags">
                        ${entry.tags.map(tag => `<span class="publication-tag">${tag}</span>`).join(' ')}
                    </div>
                `;
            }

            // Create publication entry
            const entryHTML = `
                <div class="publication-entry featured-publication">
                    <div class="publication-citation">
                        <span class="publication-authors">${authors}</span>.
                        "<span class="publication-title">${title}</span>".
                        ${venue ? `<span class="publication-journal">${venue}</span>.` : ''}
                        ${publisher ? ` ${publisher}.` : ''}
                        ${pages ? ` Pages ${pages}.` : ''}
                        ${year ? ` ${year}.` : ''}
                    </div>
                    ${tagsHTML}
                    <div class="publication-links">
                        ${doi ? `<a href="https://doi.org/${doi}" class="publication-link" target="_blank"><i class="fas fa-external-link-alt"></i> DOI</a>` : ''}
                        ${url ? `<a href="${url}" class="publication-link" target="_blank"><i class="fas fa-file-pdf"></i> PDF</a>` : ''}
                        <a href="javascript:void(0)" class="publication-link show-bibtex" data-key="${entry.key}"><i class="fas fa-code"></i> BibTeX</a>
                    </div>
                    <div class="bibtex-content" id="bibtex-${entry.key}">
@${entry.type}{${entry.key},
${Object.entries(entry.fields).map(([k, v]) => `  ${k} = {${v}}`).join(',\n')}
}
                    </div>
                </div>
            `;

            item.innerHTML = entryHTML;
            publicationList.appendChild(item);
        });

        container.appendChild(publicationList);

        // Add event listeners for showing/hiding BibTeX
        setupBibTeXToggles();

    } catch (error) {
        console.error('Error rendering featured publications:', error);
        container.innerHTML = `<p class="no-publications">Failed to load featured publications. Please try again later.</p>`;
    }
}

// Function to setup BibTeX toggle functionality (reuse from publications.js)
function setupBibTeXToggles() {
    document.querySelectorAll('.show-bibtex').forEach(button => {
        button.addEventListener('click', function() {
            const key = this.getAttribute('data-key');
            const bibtexElem = document.getElementById(`bibtex-${key}`);
            if (bibtexElem) {
                if (bibtexElem.style.display === 'block') {
                    bibtexElem.style.display = 'none';
                    this.innerHTML = '<i class="fas fa-code"></i> BibTeX';
                } else {
                    bibtexElem.style.display = 'block';
                    this.innerHTML = '<i class="fas fa-times"></i> Hide BibTeX';
                }
            }
        });
    });
}

// Function to render outreach activities
async function renderOutreach() {
    const container = document.getElementById('outreach-content');
    if (!container) return;

    // Show loading indicator
    container.innerHTML = `
        <div class="loading-indicator">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading outreach activities...</p>
        </div>
    `;

    try {
        // Load the YAML data
        const data = await loadYamlData('what-we-do.yaml');
        if (!data || !data.outreach) {
            container.innerHTML = '<p>Outreach content not available at this time.</p>';
            return;
        }

        // Clear loading indicator
        container.innerHTML = '';

        const outreach = data.outreach;

        // Create outreach content with horizontal layout
        const outreachContent = document.createElement('div');
        outreachContent.className = 'outreach-content';

        outreachContent.innerHTML = `
            <div class="outreach-intro">
                <p>${outreach.description}</p>
            </div>
            <div class="outreach-activities">
                ${outreach.activities.map(activity => `
                    <div class="outreach-activity">
                        <div class="activity-icon">
                            <i class="${activity.icon}"></i>
                        </div>
                        <h3>${activity.title}</h3>
                        <p>${activity.description}</p>
                        <a href="${activity.link}" class="learn-more">${activity.link_text} <i class="fas fa-arrow-right"></i></a>
                    </div>
                `).join('')}
            </div>
        `;
        // <div class="impact-metrics">
        //     ${outreach.metrics.map(metric => `
        //         <div class="metric">
        //             <span class="metric-number">${metric.number}</span>
        //             <span class="metric-label">${metric.label}</span>
        //         </div>
        //     `).join('')}
        // </div>

        container.appendChild(outreachContent);
    } catch (error) {
        console.error('Error rendering outreach:', error);
        container.innerHTML = '<p>Failed to load outreach content. Please try again later.</p>';
    }
}

// Function to render resources
async function renderResources() {
    const container = document.getElementById('resources-content');
    if (!container) return;

    // Show loading indicator
    container.innerHTML = `
        <div class="loading-indicator">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading resources...</p>
        </div>
    `;

    try {
        // Load the YAML data
        const data = await loadYamlData('what-we-do.yaml');
        if (!data || !data.resources) {
            container.innerHTML = '<p>Resources not available at this time.</p>';
            return;
        }

        // Clear loading indicator
        container.innerHTML = '';

        const resources = data.resources;

        // Create resources content with horizontal grid layout
        const resourcesContent = document.createElement('div');
        resourcesContent.className = 'resources-content';

        resourcesContent.innerHTML = `
            <div class="resources-intro">
                <p>${resources.description}</p>
            </div>
            <div class="resources-grid">
                ${resources.categories.map(category => `
                    <div class="resource-card">
                        <div class="resource-icon">
                            <i class="${category.icon}"></i>
                        </div>
                        <h3>${category.title}</h3>
                        <p>${category.description}</p>
                        <a href="${category.link}" class="resource-link">${category.link_text} <i class="fas fa-arrow-right"></i></a>
                    </div>
                `).join('')}
            </div>
        `;

        container.appendChild(resourcesContent);
    } catch (error) {
        console.error('Error rendering resources:', error);
        container.innerHTML = '<p>Failed to load resources. Please try again later.</p>';
    }
}

// Function to highlight active sidebar item based on scroll position
function handleScrollSpy() {
    const sections = document.querySelectorAll('.content-section');
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    // Find which section is currently most visible in the viewport
    let currentSectionId = '';
    let maxVisibility = 0;
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Calculate how much of the section is visible (as a percentage)
        let visibleHeight = 0;
        if (rect.top <= 0 && rect.bottom >= 0) {
            // Section top is above viewport top and bottom is in viewport
            visibleHeight = Math.min(rect.bottom, viewportHeight);
        } else if (rect.top >= 0 && rect.top < viewportHeight) {
            // Section top is in viewport
            visibleHeight = Math.min(viewportHeight - rect.top, rect.height);
        }
        
        const visibilityPercentage = (visibleHeight / rect.height) * 100;
        
        if (visibilityPercentage > maxVisibility) {
            maxVisibility = visibilityPercentage;
            currentSectionId = section.id;
        }
    });
    
    // Update active sidebar item
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

// Initialize the What We Do page
async function initWhatWeDoPage() {
    // Load all content sections
    renderMission();
    renderResearch();
    if (document.getElementById('featured-publications-container')) {
        // Will probably have to change the way I am displaying features for now
        await renderFeaturedPublications('featured-publications-container', 'Eugene Bagdasarian', 5);
    }
    // renderFeaturedPublications();
    // renderOutreach();
    // renderResources();

    // Set up sidebar item click handlers
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Set up scroll spy for sidebar
    window.addEventListener('scroll', handleScrollSpy);
    // Initial check for active section
    setTimeout(handleScrollSpy, 100);
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initWhatWeDoPage);
