import { getProduct, products } from "./products.js";
import formateCurrency from "../scripts/utils/money.js";
import { loadProductsFetch } from "./products.js";

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrders(order) {
  orders.unshift(order);
  saveToStorage();

}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function renderOrders() {

  let ordersHTML = "";
  orders.forEach((order) => {

    // console.log(order.id);

    let productHTML = "";
    order.products.forEach((orderProduct) => {
      // console.log(getProduct(orderProduct.productId));
      const product = getProduct(orderProduct.productId);
      productHTML += `
            
          <div class="product-image-container">
            <img src="${product.image}">
          </div>

          <div class="product-details">
            <div class="product-name">
            ${product.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${new Date((orderProduct.estimatedDeliveryTime
      )).toDateString()}
            </div>
            <div class="product-quantity">
              Quantity: ${orderProduct.quantity}
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>

            `;

    });
    // console.log(formateCurrency(order.totalCostCents));
    ordersHTML += `
        
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${new Date(order.orderTime).toDateString()}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formateCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
          ${productHTML}
        </div>
        </div>

        
        `;



  });

  document.getElementById('js-orders-grid').innerHTML = ordersHTML;
}


// export async function loadOrderFunction() {
//   try {

//     await loadProductsFetch();
//     renderOrders();

//   } catch (error) {
//     console.log(`unexpected error: ${error} `);
//   }

// }
// loadOrderFunction();