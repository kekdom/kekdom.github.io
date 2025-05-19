document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');

    // Form validation
    const validateForm = () => {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        const phone = document.getElementById('phone').value.trim();

        let isValid = true;
        let errors = [];

        // Name validation
        if (name.length < 2) {
            errors.push('Please enter a valid name (minimum 2 characters)');
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push('Please enter a valid email address');
            isValid = false;
        }

        // Phone validation (optional)
        if (phone && !/^[\+]?[0-9]{11,13}$/.test(phone)) {
            errors.push('Please enter a valid phone number with country code (e.g., +63XXXXXXXXXX)');
            isValid = false;
        }

        // Subject validation
        if (!subject) {
            errors.push('Please select a subject');
            isValid = false;
        }

        // Message validation
        if (message.length < 10) {
            errors.push('Please enter a message (minimum 10 characters)');
            isValid = false;
        }

        return { isValid, errors };
    };

    // Show error message
    const showError = (messages) => {
        // Remove any existing error messages
        const existingError = contactForm.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <div>
                ${messages.map(msg => `<div>${msg}</div>`).join('')}
            </div>
        `;

        submitBtn.parentNode.insertBefore(errorDiv, submitBtn);
    };

    // Show success message
    const showSuccess = () => {
        // Remove any existing messages
        const existingMessages = contactForm.querySelectorAll('.error-message, .success-message');
        existingMessages.forEach(msg => msg.remove());

        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <div>Thank you for your message! We'll get back to you soon.</div>
        `;

        submitBtn.parentNode.insertBefore(successDiv, submitBtn);
    };

    // Handle form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate form
        const { isValid, errors } = validateForm();

        if (!isValid) {
            showError(errors);
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        btnText.textContent = 'Sending...';

        try {
            // Simulate API call (replace with actual API endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            showSuccess();

            // Reset form
            contactForm.reset();

            // Reset button state after a delay
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                btnText.textContent = 'Send Message';
            }, 2000);

        } catch (error) {
            // Show error message
            showError(['An error occurred. Please try again later.']);

            // Reset button state
            submitBtn.classList.remove('loading');
            btnText.textContent = 'Send Message';
        }
    });

    // Real-time validation feedback
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.required && !input.value.trim()) {
                input.classList.add('invalid');
                input.classList.remove('valid');
            } else {
                input.classList.remove('invalid');
                input.classList.add('valid');
            }
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                if (input.value.trim()) {
                    input.classList.remove('invalid');
                    input.classList.add('valid');
                }
            }
        });
    });

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        // Add +63 prefix if not present
        if (value && !value.startsWith('63')) {
            value = '63' + value;
        }
        
        // Format the number
        if (value) {
            value = '+' + value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4');
        }
        
        e.target.value = value;
    });
}); 