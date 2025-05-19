// Wait for the DOM to be fully loaded before running any code
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    const shippingForm = document.getElementById('shipping-form');
    const submitButton = shippingForm.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.btn-text');
    const loadingSpinner = document.createElement('div');
    
    loadingSpinner.className = 'loading-spinner';
    loadingSpinner.style.display = 'none';
    submitButton.insertBefore(loadingSpinner, buttonText);

    // Handle payment method switching
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const gcashFields = document.getElementById('gcash-fields');
    const cardFields = document.getElementById('card-fields');

    paymentMethods.forEach(method => {
        method.addEventListener('change', () => {
            // Hide all payment fields first
            gcashFields.style.display = 'none';
            cardFields.style.display = 'none';

            // Show the selected payment fields
            if (method.value === 'gcash') {
                gcashFields.style.display = 'block';
            } else if (method.value === 'card') {
                cardFields.style.display = 'block';
            }
        });
    });

    // Display checkout items
    function displayCheckoutItems() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const checkoutItems = document.getElementById('checkout-items');
        const subtotalElement = document.getElementById('subtotal');
        const shippingElement = document.getElementById('shipping');
        const totalElement = document.getElementById('total');

        if (cart.length === 0) {
            window.location.href = 'index.html#products';
            return;
        }

        // Calculate totals
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = 150; // Fixed shipping rate
        const total = subtotal + shipping;

        // Display items
        checkoutItems.innerHTML = cart.map(item => `
            <div class="checkout-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Quantity: ${item.quantity}</p>
                    <p class="item-price">₱${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        `).join('');

        // Update totals
        subtotalElement.textContent = `₱${subtotal.toFixed(2)}`;
        shippingElement.textContent = `₱${shipping.toFixed(2)}`;
        totalElement.textContent = `₱${total.toFixed(2)}`;
    }

    // Format Philippine Postal Code
    const zipInput = document.getElementById('zip');
    zipInput.addEventListener('input', (e) => {
        // Remove any non-numeric characters
        let value = e.target.value.replace(/[^\d]/g, '');
        
        // Limit to 4 digits (Philippine postal code format)
        value = value.slice(0, 4);
        
        e.target.value = value;

        // Validate the postal code format
        const isValid = /^\d{4}$/.test(value);
        if (isValid) {
            e.target.setCustomValidity('');
            // Add success styling
            e.target.classList.remove('invalid');
            e.target.classList.add('valid');
        } else {
            e.target.setCustomValidity('Please enter a valid 4-digit postal code');
            // Add error styling
            e.target.classList.remove('valid');
            e.target.classList.add('invalid');
        }
    });

    // Format credit card number with spaces
    const cardNumberInput = document.getElementById('card-number');
    cardNumberInput.addEventListener('input', (e) => {
        // Remove any non-numeric characters and spaces
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = '';

        // Add space after every 4 digits
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }

        // Update input value and limit length
        e.target.value = formattedValue.substring(0, 19);

        // Show/hide card type icon based on first digit
        const cardTypeIcon = document.querySelector('.card-type-icon');
        const firstDigit = value.charAt(0);
        if (firstDigit === '4') {
            cardTypeIcon.className = 'card-type-icon fab fa-cc-visa';
        } else if (firstDigit === '5') {
            cardTypeIcon.className = 'card-type-icon fab fa-cc-mastercard';
        } else {
            cardTypeIcon.className = 'card-type-icon fas fa-credit-card';
        }
    });

    // Format expiry date (MM/YY)
    const expiryInput = document.getElementById('expiry');
    expiryInput.addEventListener('input', (e) => {
        // Remove non-numeric characters
        let value = e.target.value.replace(/\D/g, '');
        
        // Add slash after month
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        
        // Update input value
        e.target.value = value.substring(0, 5);

        // Validate month range (01-12)
        const month = parseInt(value.substring(0, 2));
        if (month < 1 || month > 12) {
            e.target.setCustomValidity('Please enter a valid month (01-12)');
        } else {
            e.target.setCustomValidity('');
        }
    });

    // Handle form submission
    shippingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Disable submit button and show loading state
        submitButton.disabled = true;
        buttonText.style.opacity = '0.5';
        loadingSpinner.style.display = 'inline-block';

        try {
            // Get selected payment method
            const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

            // Get form data
            const formData = {
                fullName: shippingForm.fullName.value,
                email: shippingForm.email.value,
                phone: shippingForm.phone.value,
                address: shippingForm.address.value,
                city: shippingForm.city.value,
                state: shippingForm.state.value,
                zip: shippingForm.zip.value,
                paymentMethod: paymentMethod
            };

            // Add payment-specific data
            if (paymentMethod === 'gcash') {
                formData.gcashNumber = shippingForm.gcashNumber.value;
            } else if (paymentMethod === 'card') {
                formData.cardNumber = shippingForm.cardNumber.value;
                formData.expiry = shippingForm.expiry.value;
                formData.cvv = shippingForm.cvv.value;
            }

            // Get cart items and total
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shipping = 150;
            const total = subtotal + shipping;

            // Create order object
            const order = {
                orderId: 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
                userId: user.email,
                items: cart,
                shipping: formData,
                status: 'pending',
                subtotal: subtotal,
                shipping: shipping,
                total: total,
                date: new Date().toISOString(),
                paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
                trackingNumber: 'TRK' + Date.now()
            };

            // Get existing orders
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            
            // Add new order
            orders.push(order);
            
            // Save orders
            localStorage.setItem('orders', JSON.stringify(orders));
            
            // Clear cart
            localStorage.removeItem('cart');
            
            // Store order details for confirmation page
            sessionStorage.setItem('lastOrder', JSON.stringify(order));

            // Show success message and redirect
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                Order placed successfully!
            `;
            shippingForm.appendChild(successMessage);

            // Redirect to confirmation page after a short delay
            setTimeout(() => {
                window.location.href = 'order-confirmation.html';
            }, 1500);

        } catch (error) {
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = error.message || 'An error occurred. Please try again.';
            
            const existingError = shippingForm.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            shippingForm.insertBefore(errorMessage, submitButton);

            // Reset button state
            submitButton.disabled = false;
            buttonText.style.opacity = '1';
            loadingSpinner.style.display = 'none';
        }
    });

    // Initialize the page
    displayCheckoutItems();
}); 