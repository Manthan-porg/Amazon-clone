import {cart, dltFromCart , calculateCartQuantity, updateDeliveryId} from '../data/cart.js';
import {products} from '../data/products.js';
import formateCurrency from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';

function renderOrderSummary(){
    let orderSummary = ``;

    cart.forEach((cartItem)=>{

        const  productId = cartItem.productId;


        let matchingproduct;

        products.forEach((product)=>{


            if(product.id === productId){

                matchingproduct = product;

            }
        });


        const deliveryOptionId = cartItem.deliveryOptionId;

        let deliveryOption;

        deliveryOptions.forEach((option)=>{

            if(String(option.id) === String(deliveryOptionId)){
                deliveryOption = option;
            }

        });

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays , 'days');

        const dateString = deliveryDate.format(
            'dddd, MMMM D'
        );


        orderSummary += `

         <div class="cart-item-container 
         js-cart-item-container-${matchingproduct.id}">
            <div class="delivery-date">
            Delivery date: ${dateString}
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
                    Quantity: <span class="quantity-label js-quantity-label-${matchingproduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingproduct.id}">
                    update
                  </span>
                  <input class="quantity-input js-quantity-input-${matchingproduct.id}">
                  <span class="save-quantity-link link-primary" data-product-id="${matchingproduct.id}">Save</span>
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
                ${deliveryOptionsHTML(matchingproduct, cartItem)}
              </div>
            </div>
         </div>

    `


    });



    function deliveryOptionsHTML(matchingproduct, cartItem) {

        let html = '';

        deliveryOptions.forEach((deliveryOption)=>{

            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays, 'days'
            );

            const dateString = deliveryDate.format(
                'dddd, MMMM D'
            );

            const deliveryPrice = deliveryOption.priceCents === 
                0 ? 'FREE'
                : `$${formateCurrency(deliveryOption.priceCents)} - Shipping`

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html +=

                `

                <div class="delivery-option js-delivery-option"
                data-product-id="${matchingproduct.id}"
                data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio" ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingproduct.id}">
                  <div>
                    <div class="delivery-option-date">
                    ${dateString}
                    </div>
                    <div class="delivery-option-price">
                    ${deliveryPrice}
                    </div>
                  </div>
                </div>

        `;

        });

        return html;

    }


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


    document.querySelectorAll('.js-update-quantity-link').forEach((updateLink)=>{

        updateLink.addEventListener('click',()=>{

            const productId = updateLink.dataset.productId;

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.add('is-editing-quantity');
        });


    });


    document.querySelectorAll('.save-quantity-link').forEach((saveBtn)=>{

        saveBtn.addEventListener('click',()=>{

            const productId = saveBtn.dataset.productId;

            const container = document.querySelector(`.js-cart-item-container-${productId}`);

            container.classList.remove('is-editing-quantity');

            const newQuantity =  Number(document.querySelector(`.js-quantity-input-${productId}`).value);

            cart.forEach((cartItem)=>{

                if(cartItem.productId === productId){

                    cartItem.quantity = newQuantity;

                }            

            });

            const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
            quantityLabel.innerHTML = newQuantity;


            updateCheckout(calculateCartQuantity);
        });

    });


    document.querySelectorAll('.js-delivery-option').forEach((element)=>{

        element.addEventListener('click', ()=>{

            const {productId, deliveryOptionId} = element.dataset;

            updateDeliveryId(productId, deliveryOptionId);
            
            renderOrderSummary();

        });

    });
}

renderOrderSummary();
