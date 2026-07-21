import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
/*
loadProductsFetch().then(() => {

    renderOrderSummary();
    renderPaymentSummary();

});
*/
async function loadFunction() {

    await loadProductsFetch();
    await loadCart();

    renderOrderSummary();
    renderPaymentSummary();
}

loadFunction();
