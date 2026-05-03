import {cart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formateCurrency} from './utils/money.js';

let orderSummary = ``;

cart.forEach((cartItem)=>{

    const  productId = cartItem.productId;


    let matchingproduct;

    products.forEach((product)=>{


        if(product.id === productId){

            matchingproduct = product;

            console.log(matchingproduct);
        }
    });


    orderSummary += `

         <div class="cart-item-container">
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
                    quantity: <span class="quantity-label">2</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    update
                  </span>
                  <span class="delete-quantity-link link-primary">
                    delete
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
