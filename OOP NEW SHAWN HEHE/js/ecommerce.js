// Global state management
const state = {
    cart: [],
    user: null,
    products: [
         {
            id: 'soap-1',
            name: 'Dove Beauty Bar (Pink)',
            price: 60.00,
            category: 'Skincare',
            description: 'A gentle cleansing bar with a subtle floral scent and ¼ moisturizing cream. It leaves the skin clean, soft, and hydrated after each use, making it suitable for all skin types.',
            image: 'OOP 1st draft/products pics/DOVE(1STSC).PNG'
        },
        {
            id: 'soap-2',
            name: 'Ponds Beauty White',
            price: 200.00,
            category: 'Skincare',
            description: 'a skincare range that aims to provide solutions for skin whitening and brightening. It is known for its focus on Vitamin B3, which is believed to help lighten skin from within. The range includes various products like toners, creams, face washes, and sunscreens, all designed to address issues like dark spots, uneven skin tone, and dullness',
            image: 'OOP 1st draft/products pics/PONDS (2ND SKINCARE).jpg'
        },
        {
            id: 'soap-3',
            name: 'Celeteque Hydration Facial Moisturizer',
            price: 175.00,
            category: 'Skincare',
            description: 'Celeteque offers a variety of facial washes, each designed with specific skin concerns in mind. ',
            image: 'OOP 1st draft/products pics/Celeteque(SKINCARE).png'
        },
        {
            id: 'soap-4',
            name: 'NIVEA Rose Care Hydrating Sheet Mask',
            price: 105.00,
            category: 'Skincare',
            description: 'The Nivea Rose Care Hydrating Face Sheet Mask is a sheet mask enriched with organic rose water and hyaluronic acid, designed to provide intense, long-lasting hydration to the skin. It aims to combat stress and environmental factors, leaving the skin feeling soft, radiant, and healthy-looking.',
            image: 'OOP 1st draft/products pics/Facemask(SKINCARE).png'
        },
        {
            id: 'soap-5',
            name: 'QUICKFX Pimple Eraser Cream',
            price: 110.00,
            category: 'Skincare',
            description: 'The QUICKFX Pimple Eraser Cream is a skincare product designed to combat acne by drying up pimples, reducing dark spots, and improving the appearance of blemishes. It contains ingredients like salicylic acid and glycolic acid, which help clear pores and exfoliate the skin.',
            image: 'OOP 1st draft/products pics/PimpleEraser(SKINCARE).jpg'
        },
        {
            id: 'soap-6',
            name: 'Aloe Vera Natural Skin Care Mask (1 piece)',
            price: 25.00,
            category: 'Skincare',
            description: 'A soothing and hydrating sheet mask infused with natural aloe vera extract to calm irritated skin, reduce redness, and restore moisture. Ideal for sensitive or sun-exposed skin, it delivers instant refreshment and leaves the skin soft, supple, and revitalized.',
            image: 'OOP 1st draft/products pics/AloeveraMAsk(SKINCARE).jpg'
        },
        {
            id: 'soap-7',
            name: 'NIVEA Shaving Foam',
            price: 199.00,
            category: 'Skincare',
            description: 'Nivea shaving foam is designed to provide a close, comfortable, and protected shave for sensitive skin. The formula typically contains ingredients like chamomile and hamamelis to soothe the skin, and may also include Aloe Vera or Pro-Vitamin B5 for hydration and care. ',
            image: 'NIVEA SHAVING CREAM.png'
        },
        {
            id: 'soap-8',
            name: 'BELO SunExpert SPF 50 PA+++',
            price: 250.00,
            category: 'Skincare',
            description: 'BELO SunExpert SPF 50 PA+++ is a broad-spectrum sunscreen that offers protection against both UVA and UVB rays. It is designed to be lightweight and non-sticky, making it suitable for everyday use.',
            image: 'OOP 1st draft/products pics/Sunscreen(SKINCARE).png'
        },
        {
            id: 'soap-9',
            name: 'Eskinol Facial Deep Cleanser',
            price: 200.00,
            category: 'Skincare',
            description: 'A cult-favorite deep cleanser enriched with micro-cleanse anti-bacterial formula. It removes trapped dirt, excess oil, and makeup while targeting pimples and refining pores for a clear, fresh look.',
            image: 'OOP 1st draft/products pics/EskinolCleanser(SKINCARE).png'
        },
        {
            id: 'soap-10',
            name: 'The Ordinary Vitamin C Serum',
            price: 350.00,
            category: 'Skincare',
            description: 'The Ordinary Niacinamide 10% + Zinc 1% is a water-based serum containing a high concentration of niacinamide (vitamin B3) and zinc PCA. It is designed to improve skin brightness, reduce the appearance of pores, and address uneven texture and excess oil. ',
            image: 'OOP 1st draft/products pics/VitaminCserum(SKINCARE).png'
        },
        {
            id: 'shampoo-1',
            name: 'Dove Daily Moisture Shampoo',
            price: 299.00,
            category: 'Haircare',
            description: 'Dove Daily Moisture shampoo is a moisturizing shampoo formulated to protect hair from daily wear and tear, making it manageable and silky. It is designed for everyday use, providing a nourishing system that helps hair become more resilient to damage.',
            image: 'OOP 1st draft/products pics/DoveShampoo(HAIRCARE).png'
        },
        {
            id: 'shampoo-2',
            name: 'Dove Anti-Dandruff Shampoo',
            price: 320.00,
            category: 'Haircare',
            description: 'Dove offers several anti-dandruff shampoo options, including the Dermacare Scalp Soothing Moisture Anti-Dandruff Shampoo and the Nutritive Solutions Anti-Dandruff Shampoo, designed to control and prevent dandruff while keeping hair nourished and smooth.',
            image: 'OOP 1st draft/products pics/dandruffShampoo(HAIRCARE).jpg'
        },
        {
            id: 'shampoo-3',
            name: 'SheaMoisture Coconut & Hibiscus Conditioner',
            price: 250.00,
            category: 'Haircare',
            description: 'Softens curly hair.',
            image: 'OOP 1st draft/products pics/Sheaconditioner(HAIRCARE).png'
        },
        {
            id: 'shampoo-4',
            name: 'TRESemmé Keratin Smooth Shampoo',
            price: 399.00,
            category: 'Haircare',
            description: 'The TRESemmé Keratin Smooth Shampoo is formulated with argan oil and keratin to provide a salon-quality smooth hair experience with 5 benefits in one wash: anti-frizz, detangles, shine, smooth, and tames flyaways.',
            image: 'OOP 1st draft/products pics/TresemmeKeratin(HAIRCARE).jpg'
        },
        {
            id: 'shampoo-5',
            name: 'Moroccanoil Moisture Repair Shampoo',
            price: 1650.00,
            category: 'Haircare',
            description: 'The Moroccanoil Moisture Repair Shampoo is a reparative shampoo formulated for weakened or damaged hair, especially those damaged by color, chemicals, or heat. It is designed to gently cleanse and revive hair, leaving it nourished, manageable, and strong. ',
            image: 'OOP 1st draft/products pics/Moroccanoil(HAIRCARE).png'
        },
        {
            id: 'shampoo-6',
            name: 'Amika Hydro Rush Intense Moisture Shampoo',
            price: 700.00,
            category: 'Haircare',
            description: 'A vibrant, salon-quality haircare line that uses nutrient-rich sea buckthorn berry and a blend of vitamins to promote strength, shine, and manageability. Ideal for all hair types and styling needs.',
            image: 'OOP 1st draft/products pics/AMIKA (HAIRCARE).png'
        },
        {
            id: 'shampoo-7',
            name: 'Olaplex No. 3 Hair Perfector',
            price: 1350.00,
            category: 'Haircare',
            description: 'A revolutionary bond-building treatment that repairs and strengthens chemically damaged hair at the molecular level. Ideal for bleached or color-treated ha',
            image: 'OOP 1st draft/products pics/olaplex haircare (SKINCARE).png'
        },
        {
            id: 'shampoo-8',
            name: 'L’Oreal Paris Elvive Shampoo',
            price: 299.00,
            category: 'Haircare',
            description: 'A high-performance line targeting damaged, dry, or color-treated hair. With ingredients like keratin, castor oil, or hyaluronic acid, it restores shine, elasticity, and strength..',
            image: 'LOREAL.jpg'
        },
        {
            id: 'shampoo-9',
            name: 'Pantene Pro-V Hair Fall Control Shampoo',
            price: 399.00,
            category: 'Haircare',
            description: 'A nourishing formula packed with Pro-Vitamins that strengthens hair, reduces breakage, and gives long-lasting shine and softness from root to tip.',
            image: 'OOP 1st draft/products pics/Pantene(HAIRCARE).png'
        },
        {
            id: 'shampoo-10',
            name: 'Living Proof Perfect Hair Treatment',
            price: 1350.00,
            category: 'Haircare',
            description: 'a multi-tasking hair product designed to deliver five benefits in one step: smoothing, volumizing, conditioning, strengthening, and polishing. It utilizes Living Proof is patented Healthy Hair Molecule and Thickening Molecule to nourish, hydrate, and fortify hair, while also offering heat protection up to 230°C.',
            image: 'OOP 1st draft/products pics/LIvingproof(HAIRCARE).png'
        },
        {
            id: 'lotion-1',
            name: 'Nivea Extra White Repair & Protect Lotion',
            price: 150.00,
            category: 'Bodycare',
            description: 'Nivea Extra White Repair & Protect Body Lotion is designed to address dull, damaged skin while protecting it from sun damage. It combines SPF30 PA++ protection with a Deep White Essence and 50x Vitamin C to brighten, repair, and nourish the skin, promoting a fairer and more radiant complexion. ',
            image: 'OOP 1st draft/products pics/nivealotion(BODYCARE).png'
        },
        {
            id: 'lotion-2',
            name: 'Vaseline Healthy White UV Lightening Lotion',
            price: 130.00,
            category: 'Bodycare',
            description: 'Vaseline Healthy White UV Lightening Lotion is designed to brighten skin, protect it from sun damage, and help restore natural fairness. It contains Vitamin B3, which helps to brighten the skin and restore its natural radiance over time. Triple sunscreens offer protection against UVA and UVB rays, preventing further darkening of the skin.',
            image: 'OOP 1st draft/products pics/vaselinelotion(BODYCARE).png'
        },
        {
            id: 'lotion-3',
            name: 'Human Nature Foot Spray', 
            price: 250.00,
            category: 'Bodycare',
            description: 'The Human Nature Deodorizing Foot Spray is a natural product designed to keep your feet fresh and odor-free. It contains ingredients like tea tree oil, peppermint, and aloe vera to combat odor-causing bacteria and soothe the skin',
            image: 'OOP 1st draft/products pics/footspray(BODYCARE).jpg'
        },
        {
            id: 'lotion-4',
            name: 'Cetaphil Moisturizing Lotion',
            price: 350.00,
            category: 'Bodycare',
            description: 'A dermatologist-recommended moisturizer designed for dry and sensitive skin. Its fragrance-free, lightweight formula hydrates deeply without irritation, restoring softness and protecting the skin natural barrier',
            image: 'OOP 1st draft/products pics/cetaphillotion(BODYCARE).png'
        },
        {
            id: 'lotion-5',
            name: 'Green Tea Peeling Gel',
            price: 650.00,
            category: 'Bodycare',
            description: 'A gentle, gel-based exfoliator that lifts dead skin and impurities using natural botanical enzymes. This mild yet effective peeling gel refines texture, brightens dull skin, and preps your body for moisturizers and serums.',
            image: 'OOP 1st draft/products pics/Bodycare- Peeling Gel(BODYCARE).png'
        },
        {
            id: 'lotion-6',
            name: 'Lactacyd Feminine Wash',
            price: 400.00,
            category: 'Bodycare',
            description: 'Lactacyd Feminine Wipes are designed for intimate hygiene, offering a gentle and refreshing cleanse. They are formulated with milk-based ingredients, like lactoserum, and lactic acid, which helps maintain the natural pH balance and keep the area clean.',
            image: 'OOP 1st draft/products pics/Feminine wash(BODYCARE).jpg'
        },
        {
            id: 'lotion-7',
            name: 'Gluta C Whitening Body Scrub',
            price: 120.00,
            category: 'Bodycare',
            description: 'The Gluta C Intense Whitening Body Scrub is a product designed to exfoliate, moisturize, and lighten the skin, particularly targeting dark and rough areas. It is infused with Glutathione and Vitamin C, which are known for their skin lightening properties, and may also contain Papaya enzymes for additional benefits like skin renewal and blemish lightening.',
            image: 'OOP 1st draft/products pics/Bodyscrub(BODYCARE).jpg'
        },
        {
            id: 'lotion-8',
            name: 'Dove Deodorant Original',
            price: 200.00,
            category: 'Bodycare',
            description: 'Long-lasting odor protection with skin-soothing ingredients. It fights sweat and odor throughout the day, while its gentle formula ensures no irritation—perfect for everyday confidence.',
            image: 'OOP 1st draft/products pics/Doeodorant(BODYCARE).png'
        },
        {
            id: 'lotion-9',
            name: 'Nivea Men Deodorant',
            price: 250.00,
            category: 'Bodycare',
            description: ' an anti-perspirant deodorant designed to provide powerful protection against sweat and body odor, with a focus on a long-lasting dry feeling. It uses a dual-active formula with two anti-perspirant actives to offer 48-hour protection. The spray also aims to care for the skin under the arms, leaving them feeling dry and protected while preventing sweat and odor.',
            image: 'OOP 1st draft/products pics/mendeodorant(BODYCARE).png'
        },
        {
            id: 'lotion-10',
            name: 'St. Ives Fresh Skin Apricot Scrub',
            price: 180.00,
            category: 'Bodycare',
            description: 'An invigorating body scrub designed with natural exfoliants to slough away rough, dry skin. Rich in essential oils and antioxidants, it polishes the skin while delivering deep nourishment, leaving your body smooth, glowing, and refreshed.',
            image: 'OOP 1st draft/products pics/FRESHskin(BODYCARE).jpg'
        },  
        {
            id: 'other-1',
            name: 'Natural Clay Face Mask',
            price: 250.00,
            category: 'Bodycare',
            description: 'A powerful detoxifying treatment made from 100% natural bentonite clay. It deeply cleanses pores, tightens skin, and reduces blemishes. Ideal for oily or acne-prone skin in need of a reset.',
            image: 'OOP 1st draft/products pics/Claymask(OTHERS).jpg'
        },
        {
           id: 'other-2',
           name: 'Bamboo Facial Brush',
           price: 35.00,
           category: 'Bodycare',
           description: 'A Bamboo Facial Brush is a skincare tool that uses natural bamboo as its handle and soft, microfiber bristles to gently cleanse and exfoliate the face. These brushes help remove dirt, oil, and makeup, leaving skin feeling cleaner and smoother. ',
           image: 'OOP 1st draft/products pics/hairbrush(OTHERS).jpg'
        },
        {
           id: 'other-3',
           name: 'Organic Cotton Face Towels (Pack of 3)',
           price: 28.00,
           category: 'Others',
           description: 'Organic cotton face towels are crafted from 100% organic cotton, making them gentle on the skin and ideal for sensitive skin types. They offer a luxurious and sustainable alternative to traditional face towels, ensuring a pure and safe experience.',
           image: 'OOP 1st draft/products pics/cottontowel(OTHERS).png'
       },
       {
          id: 'other-4',
          name: 'Face Roller',
          price: 38.00,
         category: 'Others',
         description: 'Smooths skin using gentle facial massage.',
         image: 'OOP 1st draft/products pics/FACE ROLLER.jpg'
      },
      {
        id: 'other-5',
        name: 'Facial Tissue Box',
        price: 40.00,
        category: 'Others',
        description: 'A face roller is a handheld massage tool, often made of jade or rose quartz, used to massage the face and neck. It is typically double-ended, with a larger roller for wider areas like cheeks and forehead, and a smaller roller for areas like under the eyes, and it can be a natural way to improve skin circulation and potentially reduce puffiness',
        image: 'OOP 1st draft/products pics/facialtissue(OTHERS).jpg'
      },
      {
       id: 'other-6',
       name: 'Silicone Face Mask Applicator',
       price: 18.00,
       category: 'Others',
       description: 'A silicone face mask applicator is a flexible tool, typically made of soft silicone, designed for precise and hygienic application of facial masks. It allows you to scoop, spread, and even apply masks with ease, while keeping your hands clean and mess-free.',
       image: 'OOP 1st draft/products pics/maskapplicator(OTHERS).jpg'
      },
     {
      id: 'other-7',
      name: 'Skincare Fridge',
      price: 2000.00,
      category: 'Others',
      description: 'A skincare fridge is a mini-refrigerator designed to store skincare products at cool, stable temperatures, typically 37-41°F (3-5°C).',
      image: 'OOP 1st draft/products pics/skincare fridges.png'
   },
   {
    id: 'other-8',
    name: 'Gua Sha Roller',
    price: 32.00,
    category: 'Others',
    description: 'A Gua Sha roller is a facial tool, often made of jade or rose quartz, that is used for massage and skincare. It is similar to a small paint roller, with a handle and a roller at each end, allowing for gentle gliding on the skin. The tool is used to massage the face and neck, promoting circulation, reducing puffiness, and potentially lifting and contouring facial features',
    image:'OOP 1st draft/products pics/guasha(OTHERS).jpg'
   },
   
   {
    id: 'other-9',
    name: 'Reusable Makeup Remover Pads (Set of 10)',
    price: 30.00,
    category: 'other',
    description: 'Reusable makeup remover pads are washable, sustainable alternatives to disposable cotton pads, designed to remove makeup effectively and gently on the skin.',
    image: 'OOP 1st draft/products pics/makeupremoverpad(OTHERS).png'
   },
   {
    id: 'other-10',
    name: 'Body Brush',
    price: 30.00,
    category: 'Others',
    description: 'Crafted with natural bristles, this dry body brush exfoliates dead skin cells while stimulating circulation and lymphatic flow. Regular use reveals smoother, softer skin and enhances the absorption of moisturizers and treatments.',
    image: 'OOP 1st draft/products pics/bodybrush(OTHERS).png'
   }
    ],
    isAuthenticated: false,
    currentCategory: 'all'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    initializeAuth();
    initializeCart();
    setupNavigation();
    setupSearch();
    loadProducts();
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            console.log('Filtering by category:', category);
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterProductsByCategory(category);
        });
    });
});

// Authentication Management
function initializeAuth() {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    if (token && userData) {
        state.isAuthenticated = true;
        state.user = JSON.parse(userData);
        updateAuthUI();
    } else {
        state.isAuthenticated = false;
        state.user = null;
        updateAuthUI();
    }
}

function updateAuthUI() {
    const userMenu = document.querySelector('.user-menu');
    if (!userMenu) return;
    
    const userIcon = userMenu.querySelector('.user-icon i');
    const userDropdown = userMenu.querySelector('.user-dropdown');
    const isProfilePage = window.location.pathname.endsWith('profile.html');
    
    if (state.isAuthenticated && state.user) {
        // Update icon
        userIcon.classList.remove('fa-user');
        userIcon.classList.add('fa-user-check');
        
        // Update dropdown content
        userDropdown.innerHTML = `
            <a href="profile.html" class="dropdown-item">
                <i class="fas fa-user-circle"></i>
                Profile
            </a>
            <a href="orders.html" class="dropdown-item">
                <i class="fas fa-box"></i>
                Orders
            </a>
            ${isProfilePage ? `
            <button onclick="window.logout()" class="dropdown-item logout-btn">
                <i class="fas fa-sign-out-alt"></i>
                Logout
            </button>
            ` : ''}
        `;
        
        // Update user icon link
        const userIconLink = userMenu.querySelector('.user-icon');
        userIconLink.href = 'profile.html';
        
        // Show auth-required elements
        document.querySelectorAll('.auth-required').forEach(el => {
            el.style.display = 'block';
        });
    } else {
        // Reset to default state
        userIcon.classList.remove('fa-user-check');
        userIcon.classList.add('fa-user');
        
        // Update dropdown for non-authenticated users
        userDropdown.innerHTML = `
            <a href="login.html" class="dropdown-item">
                <i class="fas fa-sign-in-alt"></i>
                Login
            </a>
        `;
        
        // Update user icon link
        const userIconLink = userMenu.querySelector('.user-icon');
        userIconLink.href = 'login.html';
        
        // Hide auth-required elements
        document.querySelectorAll('.auth-required').forEach(el => {
            el.style.display = 'none';
        });
    }
}

// Cart Management
function initializeCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        state.cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartDropdown = document.getElementById('cart-dropdown');
    const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Update cart count
    cartCount.textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update cart dropdown
    if (cartDropdown) {
        cartDropdown.innerHTML = `
            <div class="cart-items-list">
                ${state.cart.length > 0 ? state.cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p>₱${item.price.toFixed(2)} x ${item.quantity}</p>
                        </div>
                        <button class="remove-item" onclick="removeFromCart('${item.id}')">×</button>
                    </div>
                `).join('') : '<div class="empty-cart">Your cart is empty</div>'}
            </div>
            ${state.cart.length > 0 ? `
                <div class="cart-total">
                    <strong>Total: ₱${total.toFixed(2)}</strong>
                </div>
                <a href="checkout.html" class="checkout-btn">Proceed to Checkout</a>
            ` : ''}
        `;
    }

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(state.cart));
}

function addToCart(product) {
    const existingItem = state.cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showNotification('Product added to cart');
}

function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    updateCartUI();
    showNotification('Product removed from cart');
}

// Product Management
async function loadProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) {
        console.log('Product grid not found');
        return;
    }

    try {
        console.log('Loading products:', state.products);
        renderProducts(state.products);
    } catch (error) {
        console.error('Error loading products:', error);
        productGrid.innerHTML = '<div class="error">Error loading products. Please try again later.</div>';
    }
}

function renderProducts(products) {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    if (products.length === 0) {
        productGrid.innerHTML = '<div class="no-products">No products found in this category.</div>';
        return;
    }

    productGrid.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">₱${product.price.toFixed(2)}</p>
                <p class="description hidden">${product.description}</p>
            </div>
        </div>
    `).join('');

    // Add click event listeners to all product cards
    const productCards = productGrid.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const productId = card.dataset.productId;
            showProductDetails(productId);
        });
    });
}

// Product filtering
window.filterProductsByCategory = function(category) {
    state.currentCategory = category;
    const filteredProducts = category === 'all' 
        ? state.products 
        : state.products.filter(product => product.category === category);
    renderProducts(filteredProducts);
};

function showProductDetails(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    // Remove any existing popup
    const existingPopup = document.querySelector('.product-popup');
    if (existingPopup) {
        existingPopup.remove();
    }

    // Create popup HTML
    const popup = document.createElement('div');
    popup.className = 'product-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <button class="close-popup" aria-label="Close popup">&times;</button>
            <div class="popup-left">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="popup-right">
                <h2>${product.name}</h2>
                <div class="popup-price">₱${product.price.toFixed(2)}</div>
                <p class="popup-description">${product.description}</p>
                <div class="popup-details">
                    <div class="detail-item">
                        <span class="detail-label">Category:</span>
                        <span class="detail-value">${product.category}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Stock Status:</span>
                        <span class="detail-value">In Stock</span>
                    </div>
                </div>
                <div class="popup-actions">
                    <div class="quantity-controls">
                        <button class="qty-btn minus" aria-label="Decrease quantity">-</button>
                        <input type="number" class="qty-input" value="1" min="1" max="99" aria-label="Product quantity">
                        <button class="qty-btn plus" aria-label="Increase quantity">+</button>
                    </div>
                    <button class="add-to-cart-btn" onclick="handleAddToCart('${product.id}')">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add popup to body
    document.body.appendChild(popup);

    // Show popup with animation after a brief delay to ensure proper rendering
    setTimeout(() => {
        popup.classList.add('active');
    }, 10);

    // Setup event listeners
    const closeBtn = popup.querySelector('.close-popup');
    const quantityInput = popup.querySelector('.qty-input');
    const minusBtn = popup.querySelector('.qty-btn.minus');
    const plusBtn = popup.querySelector('.qty-btn.plus');

    // Close popup on button click
    closeBtn.addEventListener('click', () => {
        popup.classList.remove('active');
        setTimeout(() => popup.remove(), 300);
    });

    // Close popup when clicking outside
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
            setTimeout(() => popup.remove(), 300);
        }
    });

    // Close popup on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            popup.classList.remove('active');
            setTimeout(() => popup.remove(), 300);
        }
    });

    // Quantity controls
    minusBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });

    plusBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        let value = parseInt(quantityInput.value);
        if (value < 99) {
            quantityInput.value = value + 1;
        }
    });

    // Validate quantity input
    quantityInput.addEventListener('change', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        let value = parseInt(quantityInput.value);
        if (isNaN(value) || value < 1) {
            quantityInput.value = 1;
        } else if (value > 99) {
            quantityInput.value = 99;
        }
    });

    // Prevent popup from closing when clicking inside popup-content
    popup.querySelector('.popup-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Navigation and Search
function setupNavigation() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navIcons = document.querySelector('.nav-icons');
    const cartIcon = document.querySelector('.cart-icon');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navIcons.classList.toggle('active');
        });
    }

    if (cartIcon) {
        if ('ontouchstart' in window) {
            cartIcon.addEventListener('click', (e) => {
                e.preventDefault();
                cartIcon.classList.toggle('active');
            });

            document.addEventListener('click', (e) => {
                if (!cartIcon.contains(e.target)) {
                    cartIcon.classList.remove('active');
                }
            });
        }
    }
}

function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    const searchIcon = document.querySelector('.search-icon');

    if (!searchInput || !searchResults) return;

    // Add loading state
    searchInput.addEventListener('focus', () => {
        searchIcon.classList.add('fa-spinner', 'fa-spin');
        searchIcon.classList.remove('fa-search');
    });

    searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            searchIcon.classList.remove('fa-spinner', 'fa-spin');
            searchIcon.classList.add('fa-search');
            searchResults.style.display = 'none';
        }, 200);
    });

    searchInput.addEventListener('input', debounce((e) => {
        const query = e.target.value.toLowerCase().trim();
        
        // Show loading state
        searchIcon.classList.add('fa-spinner', 'fa-spin');
        searchIcon.classList.remove('fa-search');

        if (query.length < 2) {
            searchResults.style.display = 'none';
            searchIcon.classList.remove('fa-spinner', 'fa-spin');
            searchIcon.classList.add('fa-search');
            return;
        }

        const filteredProducts = state.products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );

        if (filteredProducts.length > 0) {
            searchResults.innerHTML = filteredProducts.map(product => `
                <div class="search-result-item" data-product-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="result-details">
                        <h4>${product.name}</h4>
                        <p class="item-price">₱${product.price.toFixed(2)}</p>
                        <p class="item-category">${product.category}</p>
                    </div>
                </div>
            `).join('');
            searchResults.style.display = 'block';

            // Add click handlers to search results
            const resultItems = searchResults.querySelectorAll('.search-result-item');
            resultItems.forEach(item => {
                item.addEventListener('click', () => {
                    const productId = item.dataset.productId;
                    showProductDetails(productId);
                    searchResults.style.display = 'none';
                    searchInput.value = '';
                });
            });
        } else {
            searchResults.innerHTML = '<div class="no-results">No products found</div>';
            searchResults.style.display = 'block';
        }

        // Remove loading state
        searchIcon.classList.remove('fa-spinner', 'fa-spin');
        searchIcon.classList.add('fa-search');
    }, 300));

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

// Utility Functions
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }, 100);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Event Handlers
function handleAddToCart(productId) {
    const product = state.products.find(p => p.id === productId);
    const quantityInput = document.querySelector('.qty-input');
    const quantity = parseInt(quantityInput.value);
    
    if (!product || isNaN(quantity)) return;

    const existingItem = state.cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        state.cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    updateCartUI();
    showNotification('Product added to cart');

    // Close the popup
    const popup = document.querySelector('.product-popup');
    if (popup) {
        popup.classList.remove('active');
        setTimeout(() => popup.remove(), 300);
    }
}

function handleProductClick(productId) {
    const product = state.products.find(p => p.id === productId);
    if (product) {
        // Navigate to product detail page
        window.location.href = `product.html?id=${productId}`;
    }
}

// Export functions for use in other modules
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.handleAddToCart = handleAddToCart;
window.handleProductClick = handleProductClick;
window.showProductDetails = showProductDetails; 