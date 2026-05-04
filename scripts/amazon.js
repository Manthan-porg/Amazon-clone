import { cart , addToCart , calculateCartQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import {formateCurrency} from './utils/money.js';

let productsHTML = ``;

products.forEach((product) => {

    productsHTML += `


      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
        ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
          ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
                  $${formateCurrency(product.priceCents)}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart-btn"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
`

}); 

const cartElement = document.querySelector('.js-products-grid');
if(cartElement){

   cartElement.innerHTML = productsHTML;

}



export function updateCartQuantity(cart){

const totalCartQuantity = calculateCartQuantity(cart);


const cartElement = document.querySelector('.js-cart-quantity');
    if(cartElement){

        cartElement.innerHTML = totalCartQuantity;
        
    }

}

document.querySelectorAll('.js-add-to-cart-btn').forEach((button) => {
    button.addEventListener('click', (e) => {
        const productId = e.currentTarget.dataset.productId;

 const quantitySelectorValue = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
        console.log(quantitySelectorValue);

        const addedPopUp = document.querySelector(`.js-added-to-cart-${productId}`);
        addedPopUp.classList.add('show-added-pop-up');

        setTimeout(()=>{

        addedPopUp.classList.remove('show-added-pop-up');
            
        }, 1500);

        addToCart(productId , quantitySelectorValue);


        updateCartQuantity(cart);

    });

});

window.addEventListener('load',()=>{

    updateCartQuantity(cart);

});
