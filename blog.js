// Sample blog data
const blogPosts = [
    {
        id: 1,
        title: "Getting Started with JavaScript",
        content: "JavaScript is a powerful language...",
        date: "2025-03-15"
    },
    {
        id: 2,
        title: "CSS Grid Layout",
        content: "CSS Grid makes layouts easier...",
        date: "2025-03-20"
    }
];

// Load and display blog posts
function loadBlogPosts() {
    const blogContainer = document.querySelector('.blog-posts');
    const searchInput = document.getElementById('blog-search');
    
    // Display all posts initially
    displayPosts(blogPosts);
    
    // Set up search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = blogPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) || 
            post.content.toLowerCase().includes(searchTerm)
        );
        displayPosts(filtered);
    });
    
    function displayPosts(posts) {
        blogContainer.innerHTML = '';
        
        posts.forEach(post => {
            const postElement = document.createElement('article');
            postElement.className = 'blog-post';
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p class="post-date">${post.date}</p>
                <p>${post.content}</p>
            `;
            blogContainer.appendChild(postElement);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadBlogPosts);
