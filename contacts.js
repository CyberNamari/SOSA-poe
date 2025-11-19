// Team data
const teamMembers = [
    {
        id: 1,
        name: "Kewame Motshepe",
        role: "designer",
        image: "images/designer.jpeg",
        bio: "Kewame Motshepe is the creative force behind SOSA's visual identity. His passion for drawing is evident in every design, each one crafted with care and originality. He dedicates countless hours to sketching, refining, and perfecting the pieces that define the brand's aesthetic. Kewame's artistic vision brings a unique edge to SOSA, blending streetwear culture with bold, expressive artwork. His commitment to creativity is what makes the designs not just wearable, but unforgettable.",
        quote: "I'm an artist, and I'm sensitive about my s***. – Erykah Badu",
        social: {
            instagram: {
                handle: "@Wame.4l",
                url: "https://instagram.com/Wame.4l"
            },
            tiktok: {
                handle: "@wame.77",
                url: "https://tiktok.com/wame.77"
            }
        }
    },
    {
        id: 2,
        name: "Tubatsi Monareng",
        role: "founder",
        image: "images/founder.jpg",
        bio: "Tubatsi Monareng is the visionary founder of SOSA, the mind behind the brand's concept and growth. What began as a dream has evolved into a thriving fashion label known for its quality and authenticity. Tubatsi's leadership and strategic thinking have shaped SOSA into a brand that resonates with its audience. He ensures that every product reflects the values of excellence and originality that SOSA stands for. His dedication to building something meaningful is what continues to inspire customers to fall in love with the brand.",
        quote: "You have to fight to reach your dream. You have to sacrifice and work hard for it. – Lionel Messi",
        social: {
            instagram: {
                handle: "@Namaris_world",
                url: "https://instagram.com/Namaris_world"
            },
            tiktok: {
                handle: "@Namari.s_world",
                url: "https://tiktok.com/Namari.s_world"
            }
        }
    }
];

// DOM Elements
const teamContainer = document.getElementById('team-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const roleFilter = document.getElementById('role-filter');
const toggleLayoutBtn = document.getElementById('toggle-layout');
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

// State
let filteredTeam = [...teamMembers];
let isListView = false;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderTeamMembers(filteredTeam);
    
    // Event listeners
    searchBtn.addEventListener('click', filterTeam);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') filterTeam();
    });
    roleFilter.addEventListener('change', filterTeam);
    toggleLayoutBtn.addEventListener('click', toggleLayout);
    contactForm.addEventListener('submit', handleFormSubmit);
});

// Render team members to the page
function renderTeamMembers(teamToRender) {
    teamContainer.innerHTML = '';
    
    if (teamToRender.length === 0) {
        teamContainer.innerHTML = '<p style="text-align: center; font-size: 1.2rem; padding: 40px;">No team members found matching your criteria.</p>';
        return;
    }
    
    teamToRender.forEach((member, index) => {
        const profile = document.createElement('div');
        profile.className = `profile ${index % 2 === 1 ? 'reverse' : ''}`;
        profile.style.animationDelay = `${index * 0.2}s`;
        
        const roleLabel = member.role === 'founder' ? 'Founder' : 'Designer';
        
        profile.innerHTML = `
            <img src="${member.image}" alt="${member.name}" class="profile-img">
            <div class="bio">
                <span class="role-badge">${roleLabel}</span>
                <h3>${member.name}</h3>
                <p>${member.bio}</p>
                <blockquote>${member.quote}</blockquote>
                <p>
                    <strong>Instagram:</strong> <a href="${member.social.instagram.url}" target="_blank">${member.social.instagram.handle}</a><br>
                    <strong>TikTok:</strong> <a href="${member.social.tiktok.url}" target="_blank">${member.social.tiktok.handle}</a>
                </p>
            </div>
        `;
        
        teamContainer.appendChild(profile);
    });
}

// Filter team based on search and filters
function filterTeam() {
    const searchTerm = searchInput.value.toLowerCase();
    const role = roleFilter.value;
    
    filteredTeam = teamMembers.filter(member => {
        // Search filter
        const matchesSearch = member.name.toLowerCase().includes(searchTerm) || 
                             member.bio.toLowerCase().includes(searchTerm) ||
                             member.quote.toLowerCase().includes(searchTerm);
        
        // Role filter
        const matchesRole = role === 'all' || member.role === role;
        
        return matchesSearch && matchesRole;
    });
    
    renderTeamMembers(filteredTeam);
}

// Toggle between grid and list layout
function toggleLayout() {
    isListView = !isListView;
    
    if (isListView) {
        teamContainer.classList.remove('team-grid');
        teamContainer.classList.add('team-list');
        toggleLayoutBtn.textContent = 'Grid View';
        toggleLayoutBtn.classList.add('active');
    } else {
        teamContainer.classList.remove('team-list');
        teamContainer.classList.add('team-grid');
        toggleLayoutBtn.textContent = 'List View';
        toggleLayoutBtn.classList.remove('active');
    }
    
    renderTeamMembers(filteredTeam);
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    if (!isValidEmail(formData.email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    setTimeout(() => {
        showToast('Your message has been sent successfully!', 'success');
        contactForm.reset();
        
        // In a real application, you would send this data to your backend
        console.log('Form submitted:', formData);
    }, 1000);
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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