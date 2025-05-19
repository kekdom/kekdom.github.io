function addToCart(productId, productName, productPrice, productImage) {
    const product = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage
    };
    
    window.shoppingCart.addItem(product);
    
    // Show success message
    const message = document.createElement('div');
    message.className = 'add-to-cart-message';
    message.textContent = 'Item added to cart!';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 2000);
}

// Add this CSS to your styles.css file
const style = document.createElement('style');
style.textContent = `
    .add-to-cart-message {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #0e0c0a;
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
  // Initialize carousels
  const carousels = document.querySelectorAll('.carousel-container');
  
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');
    
    if (!track || !slides.length) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Show/hide navigation arrows based on position
    const updateArrowVisibility = () => {
      if (prevButton) {
        prevButton.style.display = currentSlide === 0 ? 'none' : 'flex';
      }
      if (nextButton) {
        nextButton.style.display = currentSlide === totalSlides - 1 ? 'none' : 'flex';
      }
    };
    
    // Move to specific slide
    const goToSlide = (index) => {
      if (index < 0 || index >= totalSlides) return;
      
      const slideWidth = slides[0].offsetWidth;
      track.style.transform = `translateX(-${slideWidth * index}px)`;
      currentSlide = index;
      updateArrowVisibility();
    };
    
    // Add click handlers for navigation
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
      });
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
      });
    }
    
    // Handle touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchmove', (e) => {
      touchEndX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', () => {
      const swipeDistance = touchEndX - touchStartX;
      const minSwipeDistance = 50;
      
      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0 && currentSlide > 0) {
          // Swipe right - go to previous slide
          goToSlide(currentSlide - 1);
        } else if (swipeDistance < 0 && currentSlide < totalSlides - 1) {
          // Swipe left - go to next slide
          goToSlide(currentSlide + 1);
        }
      }
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        goToSlide(currentSlide);
      }, 100);
    });
    
    // Initialize arrow visibility
    updateArrowVisibility();
  });
  
  // Add hover effect for product cards
  const productCards = document.querySelectorAll('.soap-card, .shampoo-card, .lotion-card, .others-card');
  
  productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
  });
});