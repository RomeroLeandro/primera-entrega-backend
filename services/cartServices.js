const CartManagermongo = require('../dao/manager/cartManagerMongo');
const CartManagerfile = require('../dao/manager/cartManagerFile');
const USE_MONGO_DB = require('../config/config');
const Ticket = require('../dao/model/ticketModel');
const cartManager = new CartManagermongo()

async function getCart() {
    try {
        const carts = await cartManager.getCart();
        return carts;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener los carritos');
    }
}

async function getCartById(cid) {
    try {
        const cart = await cartManager.getCartById(cid);
        return cart;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener el carrito');
    }
}

async function addCart() {
    try {
        const newCart = await cartManager.addCart();
        return newCart;
    } catch (error) {
        console.error(error);
        throw new Error('Error al agregar el carrito');
    }
}


async function addProductToCart(cid, pid) {
    try {
        await cartManager.addProductToCart(cid, pid);
    } catch (error) {
        console.error(error);
        throw new Error('Error al agregar el producto al carrito');
    }
}

async function removeProductFromCart(cid, pid) {
    try {
        await cartManager.removeProductFromCart(cid, pid);
    } catch (error) {
        console.error(error);
        throw new Error('Error al eliminar el producto del carrito');
    }
}

async function updateCart(cartId, updatedProducts) {
    try {
        await cartManager.updateCart(cartId, updatedProducts);
    } catch (error) {
        console.error(error);
        throw new Error('Error al actualizar el carrito');
    }
}

async function updateProductQuantity(cid, pid, quantity) {
    try {
        await cartManager.updateProductQuantity(cid, pid, quantity);
    } catch (error) {
        console.error(error);
        throw new Error('Error al actualizar la cantidad del producto');
    }
}

async function purchaseCart (cartId) {
    try {
        const cart = await cartManager.getCartById(cartId);

        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        
        const productsNotPurchase = []

        const ticketItems = []

        for (const item of cart.item) {
            const product = item.product;
            const quantityInCart = item.quantity;
            const availableStock = product.stock;

            if(quantityInCart <= availableStock) {
               product.stock -= quantityInCart;
                await product.save();

                ticketItems.push({
                    product: product._id,
                    quantity: quantityInCart,
                    price: product.price
                });
            } else {
                productsNotPurchase.push(product._id);
            }
        }
        cart.isPurchased = true;
        await cart.save();

        const ticket = new Ticket ({
            code: generateTicketCode(),
            purchaseDate: new Date(),
            amount: calculateTotalAmount(ticketItems),
            purchaser: cart.userEmail,
            items: ticketItems
        });
        await ticket.save();

        return {status: 'success', message: 'Compra realizada con éxito'};
    } catch (error) {
        console.error(error);
        throw new Error('Error al realizar la compra');
    }
}

function generateTicketCode() {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000);
    const ticketCode = `TICKET-${timestamp}-${randomNum}`;
  
    return ticketCode;
  }

function calculateTotalAmount(ticketItems) {
    let totalAmount = 0;
    for (const item of ticketItems) {
      totalAmount += item.quantity * item.price;
    }
  
    return totalAmount;
  }


module.exports = {
    getCart,
    getCartById,
    addCart,
    addProductToCart,
    removeProductFromCart,
    updateCart,
    updateProductQuantity,
    purchaseCart
}