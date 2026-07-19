class Cart {
    cartItems;
    localStorageKey;

    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage() {

        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));



        if (!this.cartItems) {



            this.cartItems = [

                {

                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',

                    quantity: 2,

                    deliveryOptionId: '1fc'

                },

                {



                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',

                    quantity: 1,

                    deliveryOptionId: '2fc'

                },

            ];

        }




    }

    saveToStorage() {

        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));

    }

    addToCart(productId, quantity) {




        let matchingItem;

        this.cartItems.forEach((cartItem) => {

            if (productId === cartItem.productId) {

                matchingItem = cartItem;

            }

        });



        if (matchingItem) {

            matchingItem.quantity += quantity;

        } else {




            this.cartItems.push(

                {

                    productId,

                    quantity,

                    deliveryOptionId: '1fc'

                }

            );

        }

        this.saveToStorage();



    }




    dltFromCart(productId) {



        const newCart = [];



        this.cartItems.forEach((cartItem) => {



            if (cartItem.productId !== productId) {



                newCart.push(cartItem);



            }




        });



        this.cartItems = newCart;



        this.saveToStorage();

    }




    updateDeliveryId(productId, deliveryOptionId) {



        let matchingItem;

        this.cartItems.forEach((cartItem) => {

            if (productId === cartItem.productId) {

                matchingItem = cartItem;

            }

        });



        matchingItem.deliveryOptionId = deliveryOptionId;



        this.saveToStorage();



    }



};


const normalCart = new Cart('cart-oop');

const bussinessCart = new Cart('cart-bussiness');


console.log(normalCart);

console.log(bussinessCart);