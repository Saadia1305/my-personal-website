// ========== DOM ELEMENTS ========== //
const navLinks = document.querySelectorAll('nav a');
const contactForm = document.querySelector('form');
const blogSearch = document.getElementById('blog-search');
const blogContainer = document.getElementById('blog-posts');
const projectsContainer = document.querySelector('#projects .projects-grid');

// ========== SMOOTH SCROLLING ========== //
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// ========== BLOG FUNCTIONALITY ========== //
const blogPosts = [
  {
    date: "2025-04-10",
        title: "My Journey Into Web Development",
        excerpt: "I started coding when I was 15 years old. What began as a hobby quickly became a passion that shaped my career path...",
        content: "Full content about your web development journey...",
        category: "personal"
  },
  {
    date: "2025-04-15", 
        title: "Why I Love JavaScript",
        excerpt: "JavaScript wasn't my first programming language, but it's the one I enjoy working with the most...",
        content: "Full content about why you love JavaScript...",
        category: "technical"
  },
  {
    date: "2025-04-20",
        title: "My Favorite Development Tools",
        excerpt: "After trying dozens of editors and tools, these are the ones that made it to my daily workflow...",
        content: "Full content about your favorite tools...",
        category: "technical"
  },
    {
        date: "2025-04-25",
        title: "How I Stay Productive While Learning",
        excerpt: "Learning new technologies can be overwhelming. Here's my system for staying focused and making progress...",
        content: "Full content about your productivity system...",
        category: "personal"
}
];

function renderBlogPosts(posts) {
  blogContainer.innerHTML = posts.map(post => `
    <article class="blog-post">
      <span class="post-date">${post.date}</span>
      <h3>${post.title}</h3>
      <p class="post-excerpt">${post.excerpt}</p>
      <a href="#" class="read-more">Read more →</a>
    </article>
  `).join('');
}

// ========== PROJECTS FUNCTIONALITY ========== //
const projects = [
  {
    id: 1,
    title: "Weather App",
    description: "A simple weather application",
    category: "web"
  },
  {
    id: 2,
    title: "Task Manager",
    description: "A productivity application", 
    category: "web"
  },
  {
    id: 3,
    title: "Data Analysis Tool",
    description: "A tool for analyzing datasets",
    category: "data"
  }
];

function renderProjects() {
  projectsContainer.innerHTML = projects.map(project => `
    <div class="project" onclick="showProjectDetails(${project.id})">
      <h3>${project.title}</h3>
      <p class="project-desc">${project.description}</p>
    </div>
  `).join('');
}

// ========== CONTACT FORM VALIDATION ========== //
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formInputs = contactForm.querySelectorAll('input, textarea');
  let isValid = true;

  formInputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = 'red';
      isValid = false;
    } else {
      input.style.borderColor = '#ddd';
    }
  });

  if (isValid) {
    alert('Message sent successfully!');
    contactForm.reset();
  }
});

// ========== SEARCH FUNCTIONALITY ========== //
blogSearch.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) || 
    post.excerpt.toLowerCase().includes(searchTerm)
  );
  renderBlogPosts(filteredPosts);
});

// ========== INITIALIZATION ========== //
function init() {
  renderBlogPosts(blogPosts);
  renderProjects();
  
  // Highlight current section in nav
  window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ========== HELPER FUNCTIONS ========== //
function showProjectDetails(projectId) {
  const project = projects.find(p => p.id === projectId);
  alert(`Showing details for: ${project.title}\n${project.description}`);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
