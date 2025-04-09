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

// Animate skill bars on scroll
function animateSkills() {
    const skills = document.querySelectorAll('.skill-item');
    
    skills.forEach(skill => {
        const percent = skill.getAttribute('data-percent');
        const progressBar = skill.querySelector('.skill-progress');
        
        // Only animate if in viewport
        if (isElementInViewport(skill)) {
            progressBar.style.width = `${percent}%`;
        }
    });
}

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Run on load and scroll
window.addEventListener('load', animateSkills);
window.addEventListener('scroll', animateSkills);

// ========== BLOG FUNCTIONALITY ========== //
const blogPosts = [
  {
    date: "2025-04-02",
        title: "My Journey Into Web Development",
        excerpt: "I started coding my first time after i joined university, first time wasnt really easy but  What began as a hobby quickly became a passion that shaped my career path...",
        content: "Full content about your web development journey...",
        category: "personal"
  },
  {
    date: "2025-04-02", 
        title: "Why I Love HTML",
        excerpt: "Html was my first programming language i really loved and enoyed the html language as it seemed easy to me and also JavaScript wasn't my first programming language, but it's also one I enjoy working with ...",
        content: "Full content about why you love JavaScript...",
        category: "technical"
  },
  {
    date: "2025-04-02",
        title: "My Development Tools",
        excerpt: "After trying dozens of editors and tools, my most used tool for development is Git (for vision) and there are soo many others that i use mostly for development...",
        content: "Full content about your favorite tools...",
        category: "technical"
  },
    {
        date: "2025-04-01",
        title: "Ways that i stay productive while learning new languages",
        excerpt: "As a developer you learn new technologies everytime which can be very overwhelming and tiring but we still have to learn so here's my system for staying focused and making progress...",
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
    title: "Fotmob App",
    description: "A simple Football application",
    category: "web"
  },
  {
    id: 2,
    title: "Data Manager",
    description: "A data application", 
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
