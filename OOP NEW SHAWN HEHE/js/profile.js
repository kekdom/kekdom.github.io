document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.profile-tab');
    const sections = document.querySelectorAll('.profile-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and sections
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Show corresponding section
            const targetSection = document.getElementById(`${tab.dataset.section}-section`);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Handle logout functionality
    function handleLogout(e) {
        if (e) e.preventDefault();
        // Clear all auth data
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('user');
        
        // Show logout notification
        showNotification('Successfully logged out', 'success');
        
        // Redirect to login page after a short delay
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }

    // Attach logout handler to both logout buttons
    const logoutBtns = document.querySelectorAll('.logout-btn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', handleLogout);
    });

    // Make logout function available globally
    window.logout = handleLogout;

    // Load user data
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Populate form fields
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');

    nameInput.value = user.name || '';
    emailInput.value = user.email || '';
    phoneInput.value = user.phone || '';
    addressInput.value = user.address || '';

    // Handle profile form submission
    const profileForm = document.getElementById('profile-form');
    profileForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = profileForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

        try {
            // Update user data in storage
            const updatedUser = {
                ...user,
                name: nameInput.value,
                phone: phoneInput.value,
                address: addressInput.value
            };

            const storage = localStorage.getItem('user') ? localStorage : sessionStorage;
            storage.setItem('user', JSON.stringify(updatedUser));

            // Show success notification
            showNotification('Profile updated successfully', 'success');
        } catch (error) {
            showNotification('Failed to update profile', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });

    // Handle password form submission
    const passwordForm = document.getElementById('password-form');
    passwordForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-new-password').value;

        if (newPassword !== confirmPassword) {
            showNotification('New passwords do not match', 'error');
            return;
        }

        const submitBtn = passwordForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';

        try {
            // Here you would typically make an API call to update the password
            // For demo purposes, we'll just show a success message
            showNotification('Password updated successfully', 'success');
            passwordForm.reset();
        } catch (error) {
            showNotification('Failed to update password', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });

    // Handle preferences form submission
    const preferencesForm = document.getElementById('preferences-form');
    preferencesForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = preferencesForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

        try {
            // Here you would typically make an API call to update preferences
            // For demo purposes, we'll just show a success message
            showNotification('Preferences updated successfully', 'success');
        } catch (error) {
            showNotification('Failed to update preferences', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });

    // Handle two-factor authentication toggle
    const twoFactorToggle = document.getElementById('twoFactorToggle');
    twoFactorToggle.addEventListener('change', function() {
        showNotification(`Two-factor authentication ${this.checked ? 'enabled' : 'disabled'}`, 'success');
    });
});

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${message}
    `;
    document.body.appendChild(notification);

    // Add show class after a brief delay to trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Remove notification after animation
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
} 