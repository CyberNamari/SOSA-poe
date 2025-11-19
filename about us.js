// Content data
const aboutContent = [
    {
        id: 1,
        type: "about",
        title: "What is SOSA?",
        content: [
            "SOSA is not just a brand. It is a bold movement that redefines flaws and imperfections as symbols of strength, resilience, and individuality.",
            "In a world obsessed with perfection and curated lifestyles, SOSA stands apart by celebrating every unique story stitched into our fabrics and threads.",
            "Each piece tells a story of authenticity and courage, transforming what society may view as 'flaws' into powerful statements of identity.",
            "As a proudly Black-owned business, SOSA transcends boundaries and does not limit its focus to any one community.",
            "Instead, it unites people from all walks of life through shared experiences and the universal language of fabric and fashion.",
            "SOSA is dedicated to empowering youth, especially those who face cyberbullying, social exclusion, and other challenges.",
            "Through our brand, we foster a safe space for self-expression, confidence, and a redefinition of beauty that honours the imperfect and the real."
        ],
        icon: "❓"
    },
    {
        id: 2,
        type: "vision",
        title: "Vision",
        content: [
            "To redefine beauty and identity by empowering youth to embrace their imperfections as strengths.",
            "SOSA envisions a world where authenticity is celebrated, self-worth is unshakable, and fashion becomes a universal language of resilience, unity, and pride.",
            "Through bold storytelling and inclusive design, we aim to inspire a generation to stand tall in their truth and transform adversity into art."
        ],
        icon: "👁️"
    },
    {
        id: 3,
        type: "mission",
        title: "Mission",
        content: [
            "SOSA exists to uplift and empower young people—especially those facing exclusion, cyberbullying, and societal pressure—by creating fashion that speaks to their lived experiences.",
            "We are committed to building a safe, inclusive digital space where individuality thrives, stories are honored, and self-expression is celebrated.",
            "Through innovative design, community engagement, and a seamless online experience, our mission is to turn flaws into fashion and courage into culture."
        ],
        icon: "🎯"
    },
    {
        id: 4,
        type: "goals",
        title: "Goals",
        content: [],
        listItems: [
            { text: "Lead with originality, crafting designs and messages that stand boldly apart from mainstream fashion.", label: "Innovate" },
            { text: "Reflect and honour stories from challenging backgrounds, showcasing the beauty and art within chaos.", label: "Motivate" },
            { text: "Transform youth perceptions about beauty and worth, breaking down narrow, harmful standards.", label: "Enlighten" },
            { text: "Reach and inspire as many young souls as possible, fostering a community rooted in acceptance, strength, and empowerment.", label: "Create Positive Impact" }
        ],
        icon: "🎯"
    }
];

// Values data
const coreValues = [
    {
        id: 1,
        title: "Authenticity",
        description: "We celebrate real stories and genuine self-expression in everything we create.",
        icon: "💎"
    },
    {
        id: 2,
        title: "Empowerment",
        description: "We provide tools and platforms for youth to build confidence and embrace their uniqueness.",
        icon: "🚀"
    },
    {
        id: 3,
        title: "Inclusion",
        description: "We create spaces where everyone feels seen, heard, and valued regardless of background.",
        icon: "🤝"
    },
    {
        id: 4,
        title: "Innovation",
        description: "We constantly push creative boundaries to deliver fresh perspectives in fashion.",
        icon: "✨"
    }
];

// Timeline data
const timelineData = [
    {
        id: 1,
        year: "2023",
        title: "The Beginning",
        description: "SOSA was founded with a vision to transform fashion into a platform for empowerment and self-expression."
    },
    {
        id: 2,
        year: "2024",
        title: "First Collection Launch",
        description: "Released our debut 'Flawed & Fierce' collection, receiving overwhelming support from our community."
    },
    {
        id: 3,
        year: "2025",
        title: "Community Expansion",
        description: "Launched youth empowerment programs and expanded our digital presence to reach wider audiences."
    },
    {
        id: 4,
        year: "Future",
        title: "Global Movement",
        description: "Working towards making SOSA a globally recognized movement for authenticity and empowerment."
    }
];

// DOM Elements
const aboutContentContainer = document.getElementById('about-content');
const valuesContainer = document.getElementById('values-container');
const timelineContainer = document.getElementById('timeline-content');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const sectionFilter = document.getElementById('section-filter');
const toggleAnimationsBtn = document.getElementById('toggle-animations');
const toast = document.getElementById('toast');

// State
let filteredContent = [...aboutContent];
let animationsEnabled = true;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderAboutContent(filteredContent);
    renderCoreValues();
    renderTimeline();
    showToast('Welcome to the SOSA movement!');
    
    // Event listeners
    searchBtn.addEventListener('click', filterContent);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') filterContent();
    });
    sectionFilter.addEventListener('change', filterContent);
    toggleAnimationsBtn.addEventListener('click', toggleAnimations);
});

// Render about content sections
function renderAboutContent(contentToRender) {
    aboutContentContainer.innerHTML = '';
    
    if (contentToRender.length === 0) {
        aboutContentContainer.innerHTML = '<p style="text-align: center; font-size: 1.2rem; padding: 40px;">No content found matching your criteria.</p>';
        return;
    }
    
    contentToRender.forEach((section, index) => {
        const contentSection = document.createElement('div');
        contentSection.className = 'content-section';
        contentSection.style.animationDelay = `${index * 0.2}s`;
        
        let contentHTML = `
            <h2>${section.icon} ${section.title}</h2>
        `;
        
        // Add paragraph content
        if (section.content.length > 0) {
            section.content.forEach(paragraph => {
                contentHTML += `<p>${paragraph}</p>`;
            });
        }
        
        // Add list items if they exist
        if (section.listItems && section.listItems.length > 0) {
            contentHTML += `<ul>`;
            section.listItems.forEach(item => {
                contentHTML += `<li><strong>${item.label}:</strong> ${item.text}</li>`;
            });
            contentHTML += `</ul>`;
        }
        
        // Add divider if not the last section
        if (index < contentToRender.length - 1) {
            contentHTML += `<hr class="section-divider">`;
        }
        
        contentSection.innerHTML = contentHTML;
        aboutContentContainer.appendChild(contentSection);
    });
}

// Render core values
function renderCoreValues() {
    coreValues.forEach((value, index) => {
        const valueCard = document.createElement('div');
        valueCard.className = 'value-card';
        valueCard.style.animationDelay = `${index * 0.1}s`;
        
        valueCard.innerHTML = `
            <div class="value-icon">${value.icon}</div>
            <h3>${value.title}</h3>
            <p>${value.description}</p>
        `;
        
        valuesContainer.appendChild(valueCard);
    });
}

// Render timeline
function renderTimeline() {
    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.style.animationDelay = `${index * 0.2}s`;
        
        timelineItem.innerHTML = `
            <span class="timeline-year">${item.year}</span>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
}

// Filter content based on search and filters
function filterContent() {
    const searchTerm = searchInput.value.toLowerCase();
    const section = sectionFilter.value;
    
    filteredContent = aboutContent.filter(sectionItem => {
        // Search filter
        const matchesSearch = searchTerm === '' || 
                             sectionItem.title.toLowerCase().includes(searchTerm) ||
                             sectionItem.content.some(paragraph => paragraph.toLowerCase().includes(searchTerm)) ||
                             (sectionItem.listItems && sectionItem.listItems.some(item => 
                                 item.text.toLowerCase().includes(searchTerm) || item.label.toLowerCase().includes(searchTerm)
                             ));
        
        // Section filter
        const matchesSection = section === 'all' || sectionItem.type === section;
        
        return matchesSearch && matchesSection;
    });
    
    renderAboutContent(filteredContent);
}

// Toggle animations
function toggleAnimations() {
    animationsEnabled = !animationsEnabled;
    
    if (animationsEnabled) {
        document.body.classList.remove('no-animations');
        toggleAnimationsBtn.textContent = 'Pause Animations';
        toggleAnimationsBtn.classList.remove('active');
    } else {
        document.body.classList.add('no-animations');
        toggleAnimationsBtn.textContent = 'Play Animations';
        toggleAnimationsBtn.classList.add('active');
    }
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