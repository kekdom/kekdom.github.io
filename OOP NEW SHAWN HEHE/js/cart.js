// Shopping Cart Management System
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.total = 0;
        this.updateTotal();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image
            });
        }
        this.updateTotal();
        this.saveCart();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateTotal();
        this.saveCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) {
                this.removeItem(productId);
            }
        }
        this.updateTotal();
        this.saveCart();
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getItems() {
        return this.items;
    }

    getTotal() {
        return this.total.toFixed(2);
    }

    clearCart() {
        this.items = [];
        this.total = 0;
        this.saveCart();
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Export cart instance
window.shoppingCart = cart;

// Cart functionality
class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cart')) || [];
    this.total = 0;
    this.updateTotal();
  }

  addItem(product) {
    const existingItem = this.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    
    this.updateTotal();
    this.saveToLocalStorage();
    this.updateCartUI();
  }

  removeItem(productId) {
    const index = this.items.findIndex(item => item.id === productId);
    if (index > -1) {
      this.items.splice(index, 1);
      this.updateTotal();
      this.saveToLocalStorage();
      this.updateCartUI();
    }
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      item.quantity = parseInt(quantity);
      if (item.quantity <= 0) {
        this.removeItem(productId);
      } else {
        this.updateTotal();
        this.saveToLocalStorage();
        this.updateCartUI();
      }
    }
  }

  updateTotal() {
    this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  updateCartUI() {
    // Update cart count in header
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    // Update cart dropdown if it exists
    const cartDropdown = document.querySelector('.cart-dropdown');
    if (cartDropdown) {
        if (this.items.length === 0) {
            cartDropdown.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
        } else {
            cartDropdown.innerHTML = `
                <div class="cart-items">
                    ${this.items.map(item => `
                        <div class="cart-item">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="cart-item-details">
                                <h4>${item.name}</h4>
                                <div class="cart-item-controls">
                                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                                    <span class="quantity">${item.quantity}</span>
                                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                                </div>
                                <p class="item-price">₱${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <button class="remove-item" data-id="${item.id}">×</button>
                        </div>
                    `).join('')}
                </div>
                <div class="cart-total">
                    <span>Total:</span>
                    <span>₱${this.total.toFixed(2)}</span>
                </div>
                <a href="checkout.html" class="checkout-btn">
                    <i class="fas fa-shopping-cart"></i>
                    Proceed to Checkout
                </a>
            `;

            // Add event listeners for quantity controls and remove buttons
            cartDropdown.querySelectorAll('.quantity-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = e.target.dataset.id;
                    if (btn.classList.contains('minus')) {
                        this.decreaseQuantity(id);
                    } else {
                        this.increaseQuantity(id);
                    }
                });
            });

            cartDropdown.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = e.target.dataset.id;
                    this.removeItem(id);
                });
            });
        }
    }
  }
}

// Initialize cart and make it globally available
window.cart = new Cart();

// Add event listeners for add to cart buttons
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const productCard = e.target.closest('.soap-card, .shampoo-card, .lotion-card, .others-card');
      if (productCard) {
        const product = {
          id: e.target.dataset.id,
          name: productCard.querySelector('.product-name').textContent,
          price: parseFloat(productCard.querySelector('.product-price').textContent.replace('₱', '')),
          image: productCard.querySelector('img').src
        };
        
        window.cart.addItem(product);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'add-to-cart-success';
        successMessage.textContent = 'Added to cart!';
        productCard.appendChild(successMessage);
        
        setTimeout(() => {
          successMessage.remove();
        }, 2000);
      }
    });
  });
}); 