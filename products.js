// Product data with image file paths
const products = [
    {
        id: 1,
        name: "Classic Hoodie",
        price: 899.00,
        category: "hoodie",
        image: "images/10.png",
        description: "Comfortable and stylish hoodie for everyday wear",
        onSale: true
    },
    {
        id: 2,
        name: "Streetwear Tee",
        price: 499.00,
        category: "Standard Tee",
        image: "images/10.png",
        description: "Urban-inspired t-shirt with unique design",
        onSale: false
    },
    {
        id: 3,
        name: "White Tee",
        price: 1299.00,
        category: "jacket",
        image: "images/2.png",
        description: "Classic denim jacket with modern fit",
        onSale: true
    },
    {
        id: 4,
        name: "Track Pants",
        price: 699.00,
        category: "pants",
        image: "images/track.png",
        description: "Comfortable track pants for active lifestyle",
        onSale: false
    },
    {
        id: 5,
        name: "Character Collection",
        price: 999.00,
        category: "sweater",
        image: "images/black.png",
        description: "Cozy oversized sweater for chilly days",
        onSale: false
    },
    {
        id: 6,
        name: "Bucket Hat",
        price: 299.00,
        category: "accessory",
        image: "images/bucket-hat.png",
        description: "Trendy bucket hat to complete your look",
        onSale: true
    }
];

// Cart state
let cart = [];
let filteredProducts = [...products];

// DOM Elements
const productContainer = document.getElementById('product-container');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const sortPriceBtn = document.getElementById('sort-price');
const toast = document.getElementById('toast');

// Lightbox DOM Elements
const lightbox = document.getElementById('lightbox');
const closeLightbox = document.getElementById('close-lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxCategory = document.getElementById('lightbox-category');
const lightboxPrice = document.getElementById('lightbox-price');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const addToCartLightbox = document.getElementById('add-to-cart-lightbox');

// State variables
let currentImageIndex = 0;
let currentFilteredProducts = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Clear static content and render dynamic products
    productContainer.innerHTML = '';
    renderProducts(filteredProducts);
    updateCartUI();
    
    // Event listeners
    cartIcon.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    checkoutBtn.addEventListener('click', checkout);
    searchBtn.addEventListener('click', filterProducts);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') filterProducts();
    });
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
    sortPriceBtn.addEventListener('click', sortProductsByPrice);
    
    // Lightbox event listeners
    closeLightbox.addEventListener('click', closeLightboxModal);
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);
    addToCartLightbox.addEventListener('click', () => {
        const productId = parseInt(addToCartLightbox.getAttribute('data-id'));
        addToCart(productId);
        showToast('Product added to cart!');
    });
    
    // Close lightbox when clicking outside the content
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
});

// Render products to the page
function renderProducts(productsToRender) {
    productContainer.innerHTML = '';
    currentFilteredProducts = productsToRender; // Store for lightbox navigation
    
    if (productsToRender.length === 0) {
        productContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; font-size: 1.2rem;">No products found matching your criteria.</p>';
        return;
    }
    
    productsToRender.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.1}s`;
        
        productCard.innerHTML = `
            ${product.onSale ? '<span class="sale-badge">SALE</span>' : ''}
            <img src="${product.image}" alt="${product.name}" class="product-image" data-id="${product.id}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">R${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        productContainer.appendChild(productCard);
        
        // Add event listener to the add to cart button
        const addToCartBtn = productCard.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', () => addToCart(product.id));
        
        // Add event listener to the product image for lightbox
        const productImage = productCard.querySelector('.product-image');
        productImage.addEventListener('click', () => openLightbox(product.id));
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showToast(`${product.name} added to cart!`);
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update cart quantity
function updateCartQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartUI();
    }
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center;">Your cart is empty</p>';
        cartTotal.textContent = 'Total: R0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">R${item.price.toFixed(2)} × ${item.quantity}</div>
            </div>
            <button class="cart-item-remove" data-id="${item.id}">×</button>
        `;
        
        cartItems.appendChild(cartItem);
        
        // Add event listener to remove button
        const removeBtn = cartItem.querySelector('.cart-item-remove');
        removeBtn.addEventListener('click', () => removeFromCart(item.id));
    });
    
    cartTotal.textContent = `Total: R${total.toFixed(2)}`;
}

// Toggle cart sidebar
function toggleCart() {
    cartSidebar.classList.toggle('active');
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showToast(`Order placed! Total: R${total.toFixed(2)}`, 'success');
    cart = [];
    updateCartUI();
    toggleCart();
}

// Filter products based on search and filters
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const priceRange = priceFilter.value;
    
    filteredProducts = products.filter(product => {
        // Search filter
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                             product.description.toLowerCase().includes(searchTerm);
        
        // Category filter
        const matchesCategory = category === 'all' || product.category === category;
        
        // Price filter
        let matchesPrice = true;
        if (priceRange !== 'all') {
            if (priceRange === '0-500') {
                matchesPrice = product.price <= 500;
            } else if (priceRange === '500-1000') {
                matchesPrice = product.price > 500 && product.price <= 1000;
            } else if (priceRange === '1000-1500') {
                matchesPrice = product.price > 1000 && product.price <= 1500;
            } else if (priceRange === '1500+') {
                matchesPrice = product.price > 1500;
            }
        }
        
        return matchesSearch && matchesCategory && matchesPrice;
    });
    
    renderProducts(filteredProducts);
}

// Sort products by price
function sortProductsByPrice() {
    const isSorted = sortPriceBtn.classList.contains('active');
    
    if (isSorted) {
        // If already sorted, revert to original order
        filteredProducts = [...products];
        sortPriceBtn.classList.remove('active');
        sortPriceBtn.textContent = 'Sort by Price';
    } else {
        // Sort by price
        filteredProducts.sort((a, b) => a.price - b.price);
        sortPriceBtn.classList.add('active');
        sortPriceBtn.textContent = 'Reset Sort';
    }
    
    filterProducts();
}

// Lightbox Functions
function openLightbox(productId) {
    currentImageIndex = currentFilteredProducts.findIndex(product => product.id === productId);
    if (currentImageIndex === -1) return;
    
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightboxModal() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
}

function updateLightboxContent() {
    const currentProduct = currentFilteredProducts[currentImageIndex];
    
    // Update lightbox content
    lightboxImage.src = currentProduct.image;
    lightboxImage.alt = currentProduct.name;
    lightboxTitle.textContent = currentProduct.name;
    lightboxDescription.textContent = currentProduct.description;
    lightboxPrice.textContent = `R${currentProduct.price.toFixed(2)}`;
    lightboxCategory.textContent = getCategoryLabel(currentProduct.category);
    
    // Update navigation buttons state
    prevBtn.style.display = currentImageIndex > 0 ? 'flex' : 'none';
    nextBtn.style.display = currentImageIndex < currentFilteredProducts.length - 1 ? 'flex' : 'none';
    
    // Update add to cart button
    addToCartLightbox.setAttribute('data-id', currentProduct.id);
}

function showPreviousImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateLightboxContent();
    }
}

function showNextImage() {
    if (currentImageIndex < currentFilteredProducts.length - 1) {
        currentImageIndex++;
        updateLightboxContent();
    }
}

function handleKeyboardNavigation(e) {
    if (!lightbox.classList.contains('active')) return;
    
    switch(e.key) {
        case 'ArrowLeft':
            showPreviousImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
        case 'Escape':
            closeLightboxModal();
            break;
    }
}

// Helper function to get category label
function getCategoryLabel(category) {
    const labels = {
        'hoodie': 'Hoodie',
        'Standard Tee': 'T-Shirt',
        'jacket': 'Jacket',
        'pants': 'Pants',
        'sweater': 'Sweater',
        'accessory': 'Accessory'
    };
    return labels[category] || category;
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