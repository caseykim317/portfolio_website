export class ProjectPage {
    constructor(projectName, projectData) {
        this.projectName = projectName;
        // Ensure all properties have default values
        this.projectData = {
            title: projectData?.title || this.formatName(projectName),
            description: projectData?.description || "Project details coming soon...",
            tools: Array.isArray(projectData?.tools) ? projectData.tools : ["Three.js", "JavaScript", "HTML5"],
            links: Array.isArray(projectData?.links) ? projectData.links : [],
            images: Array.isArray(projectData?.images) ? projectData.images : []
        };
        this.element = null;
        this.createPage();
    }

    formatName(name) {
        return name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    }

    createPage() {
        // Remove existing element if it exists
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }

        this.element = document.createElement('div');
        this.element.className = 'project-page';
        this.element.style.display = 'none';
        
        // Create gallery HTML only if there are images
        const galleryHTML = this.projectData.images.length > 0 ? `
            <div class="project-gallery">
                ${this.projectData.images.map(img => `
                    <div class="gallery-item">
                        <img src="${img.src}" alt="${img.alt}">
                    </div>
                `).join('')}
            </div>
        ` : '';

        this.element.innerHTML = `
            <div class="project-content">
                <div class="project-header">
                    <h1>${this.projectData.title}</h1>
                    <button class="close-button">Return to World</button>
                </div>
                <div class="project-description">
                    ${this.projectData.description}
                </div>
                ${galleryHTML}
                <div class="project-details">
                    <div class="tools-used">
                        <h3>Tools & Technologies</h3>
                        <ul>
                            ${this.projectData.tools.map(tool => `<li>${tool}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="project-links">
                        ${this.projectData.links.map(link => `
                            <a href="${link.url}" target="_blank" class="project-link">
                                ${link.title}
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(this.element);

        // Add event listener for close button
        this.element.querySelector('.close-button').addEventListener('click', () => {
            this.hide();
        });
    }

    show() {
        console.log('Showing project page:', this.projectName);
        this.element.style.display = 'block';
        requestAnimationFrame(() => {
            this.element.classList.add('active');
        });
    }

    hide() {
        this.element.classList.remove('active');
        this.element.style.display = 'none';
    }
}
