
import { loadProductsFetch } from "../data/products.js";
import { renderOrders } from "../data/orders.js";

async function loadPage() {
    await loadProductsFetch();
    renderOrders();
}

loadPage();