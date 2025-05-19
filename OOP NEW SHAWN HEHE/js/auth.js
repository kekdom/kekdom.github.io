document.addEventListener('DOMContentLoaded', function() {
    // Helper function to clear all auth data
    function clearAuthData() {
        try {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('user');
            return true;
        } catch (error) {
            console.error('Error clearing auth data:', error);
            return false;
        }
    }

    // Only do auth redirect checks if we're NOT on the login page
    const isLoginPage = window.location.pathname.endsWith('login.html');
    
    if (isLoginPage) {
        // Clear any existing auth data when arriving at login page
        clearAuthData();
    } else {
        // Check if we're already logged in and validate token
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken'),
              user = localStorage.getItem('user') || sessionStorage.getItem('user');
        
        if (!token || !user) {
            // If no valid auth, redirect to login
            window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.pathname);
            return;
        }

        try {
            // Validate user data
            JSON.parse(user);
        } catch (e) {
            // Clear invalid data and redirect to login
            clearAuthData();
            window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.pathname);
            return;
        }
    }

    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn'),
          forms = document.querySelectorAll('.auth-form');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            // Update active states
            tabBtns.forEach(b => b.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(`${targetTab}-form`).classList.add('active');

            // Clear any existing error messages
            forms.forEach(form => {
                const error = form.querySelector('.error-message');
                if (error) error.remove();
            });
        });
    });

    // Password visibility toggle
    const toggleBtns = document.querySelectorAll('.toggle-password');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            btn.classList.toggle('fa-eye');
            btn.classList.toggle('fa-eye-slash');
        });
    });

    // Form validation and submission
    const loginForm = document.getElementById('login-form'),
          registerForm = document.getElementById('register-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = loginForm.querySelector('.auth-button');
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const remember = document.getElementById('remember').checked;

        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';

        try {
            const response = await handleLogin(email, password, remember);
            
            if (response.success) {
                // Store the token in localStorage or sessionStorage based on remember me
                const storage = remember ? localStorage : sessionStorage;
                storage.setItem('authToken', response.token);
                storage.setItem('user', JSON.stringify(response.user));

                // Redirect to the previous page or home
                const redirect = new URLSearchParams(window.location.search).get('redirect') || 'index.html';
                window.location.href = redirect;
            } else {
                showError(loginForm, 'Invalid email or password');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span class="btn-text">Login</span>';
            }
        } catch (error) {
            showError(loginForm, 'An error occurred. Please try again.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span class="btn-text">Login</span>';
        }
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = registerForm.querySelector('.auth-button');
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Enhanced validation
        if (!name.trim()) {
            showError(registerForm, 'Please enter your name');
            return;
        }

        if (!isValidEmail(email)) {
            showError(registerForm, 'Please enter a valid email address');
            return;
        }

        if (password.length < 8) {
            showError(registerForm, 'Password must be at least 8 characters long');
            return;
        }

        if (!/[A-Z]/.test(password)) {
            showError(registerForm, 'Password must contain at least one uppercase letter');
            return;
        }

        if (!/[0-9]/.test(password)) {
            showError(registerForm, 'Password must contain at least one number');
            return;
        }

        if (password !== confirmPassword) {
            showError(registerForm, 'Passwords do not match');
            return;
        }

        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';

        try {
            const response = await handleRegistration(name, email, password);
            
            if (response.success) {
                // Store the token and user data
                sessionStorage.setItem('authToken', response.token);
                sessionStorage.setItem('user', JSON.stringify(response.user));

                // Show success message before redirect
                registerForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Registration Successful!</h3>
                        <p>Redirecting you to the homepage...</p>
                    </div>
                `;

                // Redirect after a short delay
                setTimeout(() => {
                    const redirect = new URLSearchParams(window.location.search).get('redirect') || 'index.html';
                    window.location.href = redirect;
                }, 2000);
            } else {
                showError(registerForm, response.message || 'Registration failed');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span class="btn-text">Create Account</span>';
            }
        } catch (error) {
            showError(registerForm, 'An error occurred. Please try again.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span class="btn-text">Create Account</span>';
        }
    });
});

// Helper functions
function showError(form, message) {
    // Remove any existing error messages
    const existingError = form.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Create and insert new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    const submitButton = form.querySelector('.auth-button');
    form.insertBefore(errorDiv, submitButton);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mock API functions with improved error handling
async function handleLogin(email, password, remember) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // For testing purposes, accept any email/password combination
            resolve({
                success: true,
                token: 'mock-jwt-token',
                user: {
                    id: 1,
                    name: email.split('@')[0],
                    email: email
                }
            });
        }, 1000);
    });
}

async function handleRegistration(name, email, password) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // For testing purposes, always succeed
            resolve({
                success: true,
                token: 'mock-jwt-token',
                user: {
                    id: Date.now(),
                    name: name,
                    email: email
                }
            });
        }, 1000);
    });
}

// Logout function
function logout() {
    try {
        // Clear all auth data
        const cleared = clearAuthData();
        
        if (!cleared) {
            throw new Error('Failed to clear authentication data');
        }
        
        // Show logout notification
        const notification = document.createElement('div');
        notification.className = 'notification success';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            Successfully logged out
        `;
        document.body.appendChild(notification);
        
        // Remove notification after animation
        setTimeout(() => {
            notification.remove();
        }, 3000);

        // Refresh the current page instead of redirecting
        window.location.reload();
    } catch (error) {
        console.error('Error during logout:', error);
        
        // Show error notification
        const notification = document.createElement('div');
        notification.className = 'notification error';
        notification.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            Error logging out. Please try again.
        `;
        document.body.appendChild(notification);
        
        // Remove error notification after animation
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Export logout function
window.logout = logout; 