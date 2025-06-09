// Function to render hero section
async function renderHero() {
    const container = document.getElementById('hero-content');
    if (!container) return;

    try {
        const data = await loadYamlData('join.yaml');
        if (!data || !data.hero) {
            console.error('Hero data not found');
            return;
        }

        const hero = data.hero;
        container.innerHTML = `
            <div class="hero-content">
                <h1>${hero.title}</h1>
                <p>${hero.description}</p>
                <div class="hero-buttons">
                    ${hero.buttons.map(button => `
                        <a href="${button.link}" class="${button.type}-button">${button.text}</a>
                    `).join('')}
                </div>
            </div>
            <div class="hero-visual">
                <div class="hero-image">
                    <img src="${hero.image}" alt="${hero.title}">
                </div>
                <div class="hero-pattern"></div>
            </div>
        `;
    } catch (error) {
        console.error('Error rendering hero:', error);
    }
}

// Function to render graduate students section
async function renderGraduateStudents() {
    const container = document.getElementById('grad-students-content');
    if (!container) return;

    container.innerHTML = `
        <div class="loading-indicator">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading graduate programs...</p>
        </div>
    `;

    try {
        const data = await loadYamlData('join.yaml');
        if (!data || !data.graduate_students) {
            container.innerHTML = '<p>Graduate student information not available.</p>';
            return;
        }

        const gradData = data.graduate_students;
        container.innerHTML = `
            <div class="grad-intro">
                <p>${gradData.intro}</p>
            </div>
            
            <h3 class="section-subheader">Graduate Programs</h3>
            <div class="programs-grid">
                ${gradData.programs.map(program => `
                    <div class="program-card">
                        <div class="program-header">
                            <h4>${program.title}</h4>
                        </div>
                        <div class="program-content">
                            <p>${program.description}</p>
                            <ul class="program-features">
                                ${program.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                            <div class="program-details">
                                <div class="detail-item">
                                    <span class="detail-label">Duration:</span>
                                    <span>${program.details.duration}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Funding:</span>
                                    <span>${program.details.funding}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Deadline:</span>
                                    <span>${program.details.deadline}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Start Date:</span>
                                    <span>${program.details.start_date}</span>
                                </div>
                            </div>
                            <a href="${program.link}" class="program-link">Apply Now</a>
                        </div>
                    </div>
                `).join('')}
            </div>

            <h3 class="section-subheader">Current Opportunities</h3>
            <div class="opportunities-grid">
                ${gradData.current_opportunities.map(opportunity => `
                    <div class="opportunity-card">
                        <div class="opportunity-level">${opportunity.level}</div>
                        <div class="opportunity-content">
                            <h4>${opportunity.title}</h4>
                            <p>${opportunity.description}</p>
                            <div class="opportunity-meta">
                                <span><i class="fas fa-user"></i> ${opportunity.advisor}</span>
                                <span><i class="fas fa-calendar"></i> ${opportunity.deadline}</span>
                                <span><i class="fas fa-dollar-sign"></i> ${opportunity.funding}</span>
                                <span><i class="fas fa-clock"></i> ${opportunity.duration}</span>
                            </div>
                            <a href="apply.html" class="apply-button">Apply</a>
                        </div>
                    </div>
                `).join('')}
            </div>

            <h3 class="section-subheader">Resources for Applicants</h3>
            <div class="resources-grid">
                ${gradData.resources.map(resource => `
                    <div class="resource-card">
                        <div class="resource-icon">
                            <i class="${resource.icon}"></i>
                        </div>
                        <div class="resource-content">
                            <h4>${resource.title}</h4>
                            <p>${resource.description}</p>
                            <a href="${resource.link}" class="resource-link">
                                Learn More <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="contact-advisor">
                <div class="advisor-photo">
                    <img src="${gradData.contact.image}" alt="${gradData.contact.name}">
                </div>
                <div class="advisor-info">
                    <h3>Questions About Graduate Programs?</h3>
                    <p>Contact our Graduate Program Director:</p>
                    <h4>${gradData.contact.name}</h4>
                    <p><i class="fas fa-envelope"></i> ${gradData.contact.email}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${gradData.contact.office}</p>
                    <p><i class="fas fa-clock"></i> Office Hours: ${gradData.contact.office_hours}</p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error rendering graduate students section:', error);
        container.innerHTML = '<p>Failed to load graduate student information.</p>';
    }
}

// Function to render undergraduate students section
async function renderUndergraduateStudents() {
    const container = document.getElementById('undergrad-students-content');
    if (!container) return;

    container.innerHTML = `
        <div class="loading-indicator">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading undergraduate programs...</p>
        </div>
    `;

    try {
        const data = await loadYamlData('join.yaml');
        if (!data || !data.undergraduate_students) {
            container.innerHTML = '<p>Undergraduate student information not available.</p>';
            return;
        }

        const undergradData = data.undergraduate_students;
        container.innerHTML = `
            <div class="grad-intro">
                <p>${undergradData.intro}</p>
            </div>
            
            <h3 class="section-subheader">Undergraduate Programs</h3>
            <div class="programs-grid">
                ${undergradData.programs.map(program => `
                    <div class="program-card">
                        <div class="program-header">
                            <h4>${program.title}</h4>
                        </div>
                        <div class="program-content">
                            <p>${program.description}</p>
                            <ul class="program-features">
                                ${program.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                            <div class="program-details">
                                <div class="detail-item">
                                    <span class="detail-label">Duration:</span>
                                    <span>${program.details.duration}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Funding:</span>
                                    <span>${program.details.funding}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Deadline:</span>
                                    <span>${program.details.deadline}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Start Date:</span>
                                    <span>${program.details.start_date}</span>
                                </div>
                            </div>
                            <a href="${program.link}" class="program-link">Learn More</a>
                        </div>
                    </div>
                `).join('')}
            </div>

            <h3 class="section-subheader">Current Opportunities</h3>
            <div class="opportunities-grid">
                ${undergradData.current_opportunities.map(opportunity => `
                    <div class="opportunity-card">
                        <div class="opportunity-level">${opportunity.level}</div>
                        <div class="opportunity-content">
                            <h4>${opportunity.title}</h4>
                            <p>${opportunity.description}</p>
                            <div class="opportunity-meta">
                                <span><i class="fas fa-user"></i> ${opportunity.mentor}</span>
                                <span><i class="fas fa-calendar"></i> ${opportunity.deadline}</span>
                                <span><i class="fas fa-dollar-sign"></i> ${opportunity.funding}</span>
                                <span><i class="fas fa-clock"></i> ${opportunity.duration}</span>
                            </div>
                            <a href="apply.html" class="apply-button">Apply</a>
                        </div>
                    </div>
                `).join('')}
            </div>

            <h3 class="section-subheader">Resources for Students</h3>
            <div class="resources-grid">
                ${undergradData.resources.map(resource => `
                    <div class="resource-card">
                        <div class="resource-icon">
                            <i class="${resource.icon}"></i>
                        </div>
                        <div class="resource-content">
                            <h4>${resource.title}</h4>
                            <p>${resource.description}</p>
                            <a href="${resource.link}" class="resource-link">
                                Learn More <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="contact-advisor">
                <div class="advisor-photo">
                    <img src="${undergradData.contact.image}" alt="${undergradData.contact.name}">
                </div>
                <div class="advisor-info">
                    <h3>Questions About Undergraduate Opportunities?</h3>
                    <p>Contact our Undergraduate Program Coordinator:</p>
                    <h4>${undergradData.contact.name}</h4>
                    <p><i class="fas fa-envelope"></i> ${undergradData.contact.email}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${undergradData.contact.office}</p>
                    <p><i class="fas fa-clock"></i> Office Hours: ${undergradData.contact.office_hours}</p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error rendering undergraduate students section:', error);
        container.innerHTML = '<p>Failed to load undergraduate student information.</p>';
    }
}

// Function to render mailing list section
async function renderMailingList() {
    const container = document.getElementById('mailing-list-content');
    if (!container) return;

    container.innerHTML = `
        <div class="loading-indicator">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading mailing list information...</p>
        </div>
    `;

    try {
        const data = await loadYamlData('join.yaml');
        if (!data || !data.mailing_list) {
            container.innerHTML = '<p>Mailing list information not available.</p>';
            return;
        }

        const mailingData = data.mailing_list;
        container.innerHTML = `
            <div class="mailing-list-content">
                <div class="mailing-list-info">
                    <h3>${mailingData.info.title}</h3>
                    <p>${mailingData.info.description}</p>
                    <ul class="mailing-list-benefits">
                        ${mailingData.info.benefits.map(benefit => `
                            <li><i class="fas fa-check"></i> ${benefit}</li>
                        `).join('')}
                    </ul>
                    <p class="privacy-note">${mailingData.info.privacy_note}</p>
                </div>
                
                <div class="mailing-list-form">
                    <h3>${mailingData.form.title}</h3>
                    <form id="mailing-list-form">
                        ${mailingData.form.fields.map(field => {
                            if (field.type === 'select') {
                                return `
                                    <div class="form-group">
                                        <label for="${field.name}">${field.label}${field.required ? ' *' : ''}</label>
                                        <select id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>
                                            <option value="">Select an option</option>
                                            ${field.options.map(option => `<option value="${option}">${option}</option>`).join('')}
                                        </select>
                                    </div>
                                `;
                            } else if (field.type === 'checkbox') {
                                return `
                                    <div class="form-group">
                                        <label>${field.label}:</label>
                                        <div class="checkbox-group">
                                            ${field.options.map(option => `
                                                <label class="checkbox-label">
                                                    <input type="checkbox" name="${field.name}" value="${option}">
                                                    ${option}
                                                </label>
                                            `).join('')}
                                        </div>
                                    </div>
                                `;
                            } else if (field.type === 'textarea') {
                                return `
                                    <div class="form-group">
                                        <label for="${field.name}">${field.label}${field.required ? ' *' : ''}</label>
                                        <textarea id="${field.name}" name="${field.name}" rows="4" ${field.required ? 'required' : ''}></textarea>
                                    </div>
                                `;
                            } else {
                                return `
                                    <div class="form-group">
                                        <label for="${field.name}">${field.label}${field.required ? ' *' : ''}</label>
                                        <input type="${field.type}" id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>
                                    </div>
                                `;
                            }
                        }).join('')}
                        <button type="submit" class="submit-btn">Subscribe</button>
                    </form>
                </div>
            </div>

            <div class="newsletter-preview">
                <h3>${mailingData.newsletter_preview.title}</h3>
                <p>${mailingData.newsletter_preview.description}</p>
                <div class="newsletter-image">
                    <img src="${mailingData.newsletter_preview.image}" alt="Newsletter Preview">
                </div>
            </div>
        `;

        // Add form submission handler
        document.getElementById('mailing-list-form').addEventListener('submit', handleMailingListSubmission);
    } catch (error) {
        console.error('Error rendering mailing list section:', error);
        container.innerHTML = '<p>Failed to load mailing list information.</p>';
    }
}

// Function to render contact us section
async function renderContactUs() {
    const container = document.getElementById('contact-us-content');
    if (!container) return;

    container.innerHTML = `
        <div class="loading-indicator">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading contact information...</p>
        </div>
    `;

    try {
        const data = await loadYamlData('join.yaml');
        if (!data || !data.contact_us) {
            container.innerHTML = '<p>Contact information not available.</p>';
            return;
        }

        const contactData = data.contact_us;
        container.innerHTML = `
            <div class="contact-intro">
                <p>${contactData.intro}</p>
            </div>

            <h3 class="section-subheader">Contact Methods</h3>
            <div class="contact-methods-grid">
                ${contactData.contact_methods.map(method => `
                    <div class="contact-method">
                        <div class="contact-icon">
                            <i class="${method.icon}"></i>
                        </div>
                        <div class="contact-details">
                            <h4>${method.title}</h4>
                            <p>${method.description}</p>
                            ${method.email ? `<p><i class="fas fa-envelope"></i> <a href="mailto:${method.email}">${method.email}</a></p>` : ''}
                            ${method.phone ? `<p><i class="fas fa-phone"></i> ${method.phone}</p>` : ''}
                            ${method.contact_person ? `<p><i class="fas fa-user"></i> ${method.contact_person}</p>` : ''}
                            ${method.address ? `<p><i class="fas fa-map-marker-alt"></i> ${method.address}</p>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
            // <h3 class="section-subheader">${contactData.office_info.title}</h3>
            // <div class="office-info">
            //     <div class="office-details">
            //         <h4>Address</h4>
            //         <p>${contactData.office_info.full_address}</p>
                    
            //         <h4>Hours</h4>
            //         <p>${contactData.office_info.hours}</p>
                    
            //         <h4>Parking</h4>
            //         <p>${contactData.office_info.parking}</p>
                    
            //         <h4>Directions</h4>
            //         <p>${contactData.office_info.directions}</p>
            //     </div>
            // </div>

        // Add form submission handler
    } catch (error) {
        console.error('Error rendering contact us section:', error);
        container.innerHTML = '<p>Failed to load contact information.</p>';
    }
}

// Function to handle mailing list form submission
// function handleMailingListSubmission(event) {
//     event.preventDefault();
    
//     // Get form data
//     const formData = new FormData(event.target);
//     const data = {};
    
//     // Process regular fields
//     for (let [key, value] of formData.entries()) {
//         if (data[key]) {
//             // Handle multiple values (like checkboxes)
//             if (Array.isArray(data[key])) {
//                 data[key].push(value);
//             } else {
//                 data[key] = [data[key], value];
//             }
//         } else {
//             data[key] = value;
//         }
//     }
    
//     // Process checkboxes specifically
//     const checkboxes = document.querySelectorAll('input[name="interests"]:checked');
//     data.interests = Array.from(checkboxes).map(cb => cb.value);
    
//     console.log('Mailing list subscription data:', data);
    
//     // Show success message
//     const submitBtn = event.target.querySelector('.submit-btn');
//     const originalText = submitBtn.textContent;
//     submitBtn.textContent = 'Subscribed!';
//     submitBtn.disabled = true;
    
//     setTimeout(() => {
//         submitBtn.textContent = originalText;
//         submitBtn.disabled = false;
//         event.target.reset();
//     }, 2000);
// }

// Function to handle contact form submission
// function handleContactFormSubmission(event) {
//     event.preventDefault();
    
//     // Get form data
//     const formData = new FormData(event.target);
//     const data = Object.fromEntries(formData);
    
//     console.log('Contact form data:', data);
    
//     // Show success message
//     const submitBtn = event.target.querySelector('.submit-btn');
//     const originalText = submitBtn.textContent;
//     submitBtn.textContent = 'Message Sent!';
//     submitBtn.disabled = true;
    
//     setTimeout(() => {
//         submitBtn.textContent = originalText;
//         submitBtn.disabled = false;
//         event.target.reset();
//     }, 2000);
// }

// Function to handle scroll spy for sidebar navigation
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

// Initialize Join page functionality
function initJoinPage() {
    // Load all content sections
    renderHero();
    // renderGraduateStudents();
    // renderUndergraduateStudents();
    // renderMailingList();
    renderContactUs();

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
document.addEventListener('DOMContentLoaded', initJoinPage);
