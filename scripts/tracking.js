import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";

async function loadPage() {
    // 1. Load the full products list first, so getProduct() has data to search through.
    await loadProductsFetch();

    // 2. Read orderId and productId from the URL
    //    e.g. tracking.html?orderId=abc123&productId=xyz789

    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    // 3. Find the matching order, then the matching product inside that order
    const order = orders.find((order) => order.id === orderId);

    if (!order) {
        document.querySelector('.order-tracking').innerHTML =
            '<p>Order not found.</p>';
        return;
    }

    const orderProduct = order.products.find(
        (product) => product.productId === productId
    );

    if (!orderProduct) {
        document.querySelector('.order-tracking').innerHTML =
            '<p>Product not found in this order.</p>';
        return;
    }

    // 4. Get the full product details (name, image) from the products catalog
    const product = getProduct(productId);

    // 5. Fill in the page with THIS order's/product's info
    document.querySelector('.js-product-name').innerText = product.name;
    document.querySelector('.js-product-image').src = product.image;
    document.querySelector('.js-product-quantity').innerText =
        `Quantity: ${orderProduct.quantity}`;

    const deliveryDate = formatDate(orderProduct.estimatedDeliveryTime);
    document.querySelector('.js-delivery-date').innerText =
        `Arriving on ${deliveryDate}`;

    // 6. Work out how far along the delivery is, based on today's date
    //    compared to the order date and estimated delivery date.
    const today = Date.now();
    const orderTime = order.orderTime;
    const deliveryTime = orderProduct.estimatedDeliveryTime;

    let progressPercentage =
        ((today - orderTime) / (deliveryTime - orderTime)) * 100;
    progressPercentage = Math.max(0, Math.min(100, progressPercentage));

    document.querySelector('.js-progress-bar').style.width =
        `${progressPercentage}%`;

    let currentStatus = 'preparing';
    if (progressPercentage >= 100) {
        currentStatus = 'delivered';
    } else if (progressPercentage > 0) {
        currentStatus = 'shipped';
    }

    document.querySelectorAll('.js-progress-label').forEach((label) => {
        if (label.dataset.status === currentStatus) {
            label.classList.add('current-status');
        } else {
            label.classList.remove('current-status');
        }
    });
}

function formatDate(timestamp) {
    return new Date(timestamp).toDateString();

}

loadPage();