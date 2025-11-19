// News data
const newsItems = [
    {
        id: 1,
        title: "🔥 Pop-Up Shop: Johannesburg",
        content: "We're coming to Jozi! SOSA will host a one-day pop-up shop at The Playground Market in Braamfontein on Saturday, October 12th. Come through for exclusive drops, live art, and meet the creators behind the movement.",
        date: "2025-09-26",
        category: "events",
        icon: "🔥"
    },
    {
        id: 2,
        title: "🎤 SOSA Talks: Youth Empowerment Panel",
        content: "Join us for a powerful conversation on identity, cyberbullying, and self-worth at our SOSA Talks event in Cape Town on November 3rd. Featuring local creatives, activists, and fashion leaders. Free entry — RSVP required.",
        date: "2025-09-20",
        category: "community",
        icon: "🎤"
    },
    {
        id: 3,
        title: "🧵 New Collection Launch: 'Flawed & Fierce'",
        content: "Our latest collection drops online October 1st. Each piece is inspired by real stories of resilience and rebellion. Limited quantities — don't miss out!",
        date: "2025-09-15",
        category: "releases",
        icon: "🧵"
    },
    {
        id: 4,
        title: "🤝 Collaboration with Local Artists",
        content: "We're excited to announce our collaboration with 5 emerging South African artists. Limited edition pieces featuring their unique artwork will be available starting November 15th.",
        date: "2025-09-10",
        category: "collaborations",
        icon: "🤝"
    },
    {
        id: 5,
        title: "🏆 SOSA Wins Design Innovation Award",
        content: "We're proud to announce that SOSA has been awarded the 2025 Design Innovation Award for our commitment to sustainable fashion and community engagement.",
        date: "2025-09-05",
        category: "community",
        icon: "🏆"
    },
    {
        id: 6,
        title: "📦 Free Shipping Nationwide",
        content: "For a limited time, enjoy free shipping on all orders over R500 anywhere in South Africa. Offer valid until October 31st, 2025.",
        date: "2025-08-28",
        category: "releases",
        icon: "📦"
    }
];

// Social media data
const socialLinks = [
    {
        platform: "Instagram",
        handle: "@SOSA",
        url: "https://instagram.com/SOSA",
        icon: "📸"
    },
    {
        platform: "TikTok",
        handle: "@SOSA",
        url: "https://tiktok.com/@SOSA",
        icon: "🎵"
    },
    {
        platform: "Twitter/X",
        handle: "@SOSA",
        url: "https://twitter.com/SOSA",
        icon: "🐦"
    },
    {
        platform: "Facebook",
        handle: "SOSA",
        url: "https://facebook.com/SOSA",
        icon: "📘"
    }
];

// DOM Elements
const newsContainer = document.getElementById('news-container');
const socialContainer = document.getElementById('social-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const categoryFilter = document.getElementById('category-filter');
const dateFilter = document.getElementById('date-filter');
const sortDateBtn = document.getElementById('sort-date');
const newsletterEmail = document.getElementById('newsletter-email');
const subscribeBtn = document.getElementById('subscribe-btn');
const toast = document.getElementById('toast');

// Filtered news state
let filteredNews = [...newsItems];
let isDateSorted = false;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderNewsItems(filteredNews);
    renderSocialLinks();
    
    // Event listeners
    searchBtn.addEventListener('click', filterNews);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') filterNews();
    });
    categoryFilter.addEventListener('change', filterNews);
    dateFilter.addEventListener('change', filterNews);
    sortDateBtn.addEventListener('click', sortNewsByDate);
    subscribeBtn.addEventListener('click', subscribeToNewsletter);
});

// Render news items to the page
function renderNewsItems(newsToRender) {
    newsContainer.innerHTML = '';
    
    if (newsToRender.length === 0) {
        newsContainer.innerHTML = '<p style="text-align: center; font-size: 1.2rem; padding: 40px;">No news items found matching your criteria.</p>';
        return;
    }
    
    newsToRender.forEach((item, index) => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.style.animationDelay = `${index * 0.1}s`;
        
        // Format date for display
        const displayDate = formatDisplayDate(item.date);
        
        newsItem.innerHTML = `
            <span class="news-category">${getCategoryLabel(item.category)}</span>
            <h3>${item.icon} ${item.title}</h3>
            <p>${item.content}</p>
            <span class="date">Posted: ${displayDate}</span>
        `;
        
        newsContainer.appendChild(newsItem);
    });
}

// Render social links
function renderSocialLinks() {
    socialLinks.forEach((social, index) => {
        const socialCard = document.createElement('div');
        socialCard.className = 'social-card';
        socialCard.style.animationDelay = `${index * 0.1}s`;
        
        socialCard.innerHTML = `
            <a href="${social.url}" target="_blank">
                <span class="social-icon">${social.icon}</span>
                <div>
                    <div>${social.platform}</div>
                    <div style="font-size: 0.9rem; font-weight: normal;">${social.handle}</div>
                </div>
            </a>
        `;
        
        socialContainer.appendChild(socialCard);
    });
}

// Filter news based on search and filters
function filterNews() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const dateRange = dateFilter.value;
    
    filteredNews = newsItems.filter(item => {
        // Search filter
        const matchesSearch = item.title.toLowerCase().includes(searchTerm) || 
                             item.content.toLowerCase().includes(searchTerm);
        
        // Category filter
        const matchesCategory = category === 'all' || item.category === category;
        
        // Date filter
        let matchesDate = true;
        if (dateRange !== 'all') {
            const itemDate = new Date(item.date);
            const today = new Date();
            
            if (dateRange === 'week') {
                const oneWeekAgo = new Date(today);
                oneWeekAgo.setDate(today.getDate() - 7);
                matchesDate = itemDate >= oneWeekAgo;
            } else if (dateRange === 'month') {
                const oneMonthAgo = new Date(today);
                oneMonthAgo.setMonth(today.getMonth() - 1);
                matchesDate = itemDate >= oneMonthAgo;
            } else if (dateRange === 'quarter') {
                const threeMonthsAgo = new Date(today);
                threeMonthsAgo.setMonth(today.getMonth() - 3);
                matchesDate = itemDate >= threeMonthsAgo;
            }
        }
        
        return matchesSearch && matchesCategory && matchesDate;
    });
    
    // Apply date sorting if active
    if (isDateSorted) {
        filteredNews.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    renderNewsItems(filteredNews);
}

// Sort news by date
function sortNewsByDate() {
    isDateSorted = !isDateSorted;
    
    if (isDateSorted) {
        filteredNews.sort((a, b) => new Date(b.date) - new Date(a.date));
        sortDateBtn.classList.add('active');
        sortDateBtn.textContent = 'Newest First';
    } else {
        filteredNews.sort((a, b) => new Date(a.date) - new Date(b.date));
        sortDateBtn.classList.remove('active');
        sortDateBtn.textContent = 'Oldest First';
    }
    
    renderNewsItems(filteredNews);
}

// Subscribe to newsletter
function subscribeToNewsletter() {
    const email = newsletterEmail.value.trim();
    
    if (!email) {
        showToast('Please enter your email address', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        showToast('Successfully subscribed to our newsletter!', 'success');
        newsletterEmail.value = '';
        
        // In a real application, you would send this to your backend
        console.log('Subscribed email:', email);
    }, 1000);
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to format date for display
function formatDisplayDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Helper function to get category label
function getCategoryLabel(category) {
    const labels = {
        'events': 'Event',
        'releases': 'New Release',
        'collaborations': 'Collaboration',
        'community': 'Community'
    };
    return labels[category] || 'News';
}

// Show toast notification
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = 'toast';
    
    if (type === 'error') {
        toast.style.backgroundColor = '#e74c3c';
    } else if (type === 'success') {
        toast.style.backgroundColor = '#2ecc71';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}