import {cart, dltFromCart , calculateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {formateCurrency} from './utils/money.js';
import  {updateCartQuantity} from './amazon.js';
let orderSummary = ``;

cart.forEach((cartItem)=>{

    const  productId = cartItem.productId;


    let matchingproduct;

    products.forEach((product)=>{


        if(product.id === productId){

            matchingproduct = product;

        }
    });


    orderSummary += `

         <div class="cart-item-container 
         js-cart-item-container-${matchingproduct.id}">
            <div class="delivery-date">
              delivery date: tuesday, june 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingproduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingproduct.name}
                </div>
                <div class="product-price">
                  $${formateCurrency(matchingproduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    update
                  </span>
                  <span class="delete-quantity-link js-delete-link link-primary" 
                  data-product-id="${matchingproduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingproduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      tuesday, june 21
                    </div>
                    <div class="delivery-option-price">
                      free shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingproduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      wednesday, june 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingproduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      monday, june 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
         </div>

    `


});

document.querySelector('.js-order-summary').innerHTML = orderSummary;

document.querySelectorAll('.js-delete-link').forEach((link)=>{
link.addEventListener('click',()=>{
    const productId = link.dataset.productId;
   dltFromCart(productId); 
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
    updateCheckout(calculateCartQuantity);
});
});

    updateCheckout(calculateCartQuantity);

function updateCheckout(getCartQuantity){

const totalCartQuantity = getCartQuantity(cart);
const checkoutNumber = document.getElementById("js-checkout-items-number");
    if(checkoutNumber){

        checkoutNumber.innerHTML =   `${totalCartQuantity} Items`;

    }
}

