// Load and filter projects
async function loadProjects() {
    const response = await fetch('projects.json');
    const projects = await response.json();
    const filterControls = document.querySelector('.filter-controls');
    const projectsGrid = document.querySelector('.projects-grid');
    
    // Create filter buttons
    const categories = [...new Set(projects.map(p => p.category))];
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.addEventListener('click', () => filterProjects(category));
        filterControls.appendChild(button);
    });
    
    // Display all projects initially
    displayProjects(projects);
    
    function filterProjects(category) {
        const filtered = category === 'all' 
            ? projects 
            : projects.filter(p => p.category === category);
        displayProjects(filtered);
    }
    
    function displayProjects(projectsToShow) {
        projectsGrid.innerHTML = '';
        projectsToShow.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <button class="view-details" data-id="${project.id}">View Details</button>
            `;
            projectsGrid.appendChild(card);
        });
    }
}

// Initialize portfolio
document.addEventListener('DOMContentLoaded', loadProjects);
