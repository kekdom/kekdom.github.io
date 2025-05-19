document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Get DOM elements
    const ordersList = document.querySelector('.orders-list');
    const noOrders = document.querySelector('.no-orders');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Get orders from localStorage
    function getUserOrders() {
        const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
        return allOrders.filter(order => order.userId === user.email);
    }

    // Format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Get status class
    function getStatusClass(status) {
        switch(status.toLowerCase()) {
            case 'pending': return 'pending';
            case 'processing': return 'processing';
            case 'shipped': return 'shipped';
            case 'delivered': return 'delivered';
            default: return 'pending';
        }
    }

    // Filter orders
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const status = button.dataset.status;
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter and render orders
            const orders = getUserOrders();
            const filteredOrders = status === 'all' 
                ? orders 
                : orders.filter(order => order.status === status);
            
            renderOrders(filteredOrders);
        });
    });

    // Render orders
    function renderOrders(ordersToRender) {
        if (ordersToRender.length === 0) {
            ordersList.style.display = 'none';
            noOrders.style.display = 'flex';
            return;
        }

        ordersList.style.display = 'grid';
        noOrders.style.display = 'none';

        ordersList.innerHTML = ordersToRender.map(order => `
            <div class="order-card">
                <div class="order-header">
                    <div class="order-info">
                        <span class="order-number">#${order.orderId}</span>
                        <span class="order-date">${formatDate(order.date)}</span>
                    </div>
                    <span class="order-status ${getStatusClass(order.status)}">${order.status}</span>
                </div>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="item-details">
                                <h3>${item.name}</h3>
                                <p>Quantity: ${item.quantity}</p>
                                <p class="item-price">₱${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="order-footer">
                    <div class="order-total">
                        <span>Total:</span>
                        <span class="total-amount">₱${order.total.toFixed(2)}</span>
                    </div>
                    <button class="track-order-btn" onclick="trackOrder('${order.orderId}')">
                        <i class="fas fa-truck"></i>
                        Track Order
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Track order function
    window.trackOrder = function(orderId) {
        const orders = getUserOrders();
        const order = orders.find(o => o.orderId === orderId);
        
        if (!order) return;

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'tracking-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal">&times;</button>
                <h2>Order Tracking</h2>
                <p class="order-number">Order #${order.orderId}</p>
                
                <div class="tracking-timeline">
                    <div class="timeline-item ${order.status === 'pending' ? 'active' : 'completed'}">
                        <i class="fas fa-box"></i>
                        <div class="timeline-content">
                            <h3>Order Placed</h3>
                            <p>${formatDate(order.date)}</p>
                        </div>
                    </div>
                    <div class="timeline-item ${order.status === 'processing' ? 'active' : (order.status === 'shipped' || order.status === 'delivered' ? 'completed' : '')}">
                        <i class="fas fa-cog"></i>
                        <div class="timeline-content">
                            <h3>Processing</h3>
                            <p>Your order is being prepared</p>
                        </div>
                    </div>
                    <div class="timeline-item ${order.status === 'shipped' ? 'active' : (order.status === 'delivered' ? 'completed' : '')}">
                        <i class="fas fa-truck"></i>
                        <div class="timeline-content">
                            <h3>Shipped</h3>
                            <p>Your order is on its way</p>
                        </div>
                    </div>
                    <div class="timeline-item ${order.status === 'delivered' ? 'active' : ''}">
                        <i class="fas fa-home"></i>
                        <div class="timeline-content">
                            <h3>Delivered</h3>
                            <p>Package has been delivered</p>
                        </div>
                    </div>
                </div>

                <div class="shipping-details">
                    <h3>Shipping Details</h3>
                    <p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>
                    <p><strong>Delivery Address:</strong></p>
                    <p>${order.shipping.fullName}</p>
                    <p>${order.shipping.address}</p>
                    <p>${order.shipping.city}, ${order.shipping.state} ${order.shipping.zip}</p>
                    <p>${order.shipping.phone}</p>
                </div>
            </div>
        `;

        // Add modal to body
        document.body.appendChild(modal);

        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.onclick = () => {
            document.body.removeChild(modal);
        };

        // Close on outside click
        modal.onclick = (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        };
    };

    // Initial render
    renderOrders(getUserOrders());
});