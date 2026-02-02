// DOM elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioGrid = document.querySelector('.portfolio-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxCategory = document.getElementById('lightbox-category');
const closeLightbox = document.querySelector('.close-lightbox');
const contactForm = document.getElementById('contactForm');

// Portfolio data - in a real scenario, this would come from an API or database
const portfolioItems = [
    {
        id: 1,
        title: "Logo Modern",
        category: "logo",
        image: "portfolio/logo.png"
    },
    {
        id: 2,
        title: "Desain Jersey Tim Sepakbola",
        category: "apparel",
        image: "portfolio/kaos.png"
    },
    {
        id: 3,
        title: "Brand Identity Education",
        category: "branding",
        image: "portfolio/branding.png"
    },
    {
        id: 4,
        title: "Logo Real Estate",
        category: "logo",
        image: "portfolio/logo2.png"
    },
    {
        id: 5,
        title: "T-Shirt Komunitas Perdamaian",
        category: "apparel",
        image: "portfolio/dskaos.png"
    },
    {
        id: 6,
        title: "Branding Law Firm",
        category: "branding",
        image: "portfolio/firma.png"
    },
    {
        id: 7,
        title: "Logo Anniversary",
        category: "logo",
        image: "portfolio/100.png"
    },
    {
        id: 8,
        title: "Website Sekolah",
        category: "branding",
        image: "portfolio/program.png"
    }
];

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Initialize portfolio items
function initPortfolio() {
    portfolioGrid.innerHTML = '';
    
    portfolioItems.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = `portfolio-item ${item.category}`;
        portfolioItem.setAttribute('data-category', item.category);
        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="portfolio-img">
            <div class="portfolio-overlay">
                <h4>${item.title}</h4>
                <p>${getCategoryName(item.category)}</p>
            </div>
        `;
        
        portfolioItem.addEventListener('click', () => openLightbox(item));
        portfolioGrid.appendChild(portfolioItem);
    });
}

// Get category display name
function getCategoryName(category) {
    const categories = {
        'logo': 'Desain Logo',
        'apparel': 'Desain Apparel',
        'branding': 'Branding Identity'
    };
    return categories[category] || category;
}

// Portfolio filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // Show/hide portfolio items based on filter
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Lightbox functionality
function openLightbox(item) {
    lightboxImg.src = item.image;
    lightboxImg.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxCategory.textContent = getCategoryName(item.category);
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // In a real scenario, you would send this data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Terima kasih! Pesan Anda telah dikirim. Kami akan menghubungi Anda segera.');
        
        // Reset form
        contactForm.reset();
    });
}

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initPortfolio();
    
    // Add fade-in animation to elements when scrolling
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});