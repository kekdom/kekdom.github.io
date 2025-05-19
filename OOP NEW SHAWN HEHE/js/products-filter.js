document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productGrid = document.querySelector('.product-grid');
    const loadingSpinner = document.querySelector('.loading-spinner');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show loading state
            if (loadingSpinner) {
                loadingSpinner.style.display = 'block';
                productGrid.style.opacity = '0.5';
            }

            // Filter products
            setTimeout(() => {
                window.filterProductsByCategory(category);
                
                // Hide loading state
                if (loadingSpinner) {
                    loadingSpinner.style.display = 'none';
                    productGrid.style.opacity = '1';
                }
            }, 300);
        });
    });
});