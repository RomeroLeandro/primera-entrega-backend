const errorMenssages = {
    PRODUCT_NOT_FOUND: 'Product not found',
    PRODUCT_NOT_CREATED: 'Product not created',
    PRODUCT_NOT_UPDATED: 'Product not updated',
    PRODUCT_NOT_DELETED: 'Product not deleted',
    PRODUCT_ALREADY_EXISTS: 'Product already exists',
    PRODUCT_DELETE_FAILED: 'Product delete failed',
    PRODUCT_UPDATE_FAILED: 'Product update failed',
    PRODUCT_CREATE_FAILED: 'Product create failed',
    INVALID_PRODUCT: 'Invalid product',
    CART_NOT_FOUND: 'Cart not found',
    CART_NOT_CREATED: 'Cart not created',
    CART_NOT_UPDATED: 'Cart not updated',
    CART_NOT_DELETED: 'Cart not deleted',
    CART_ALREADY_EXISTS: 'Cart already exists',
    CART_DELETE_FAILED: 'Cart delete failed',
    CART_UPDATE_FAILED: 'Cart update failed',
    CART_CREATE_FAILED: 'Cart create failed',
    INVALID_CART: 'Invalid cart',
    CART_ITEM_NOT_FOUND: 'Cart item not found',
    CART_ITEM_NOT_CREATED: 'Cart item not created',
    CART_ITEM_NOT_UPDATED: 'Cart item not updated',
    CART_ITEM_NOT_DELETED: 'Cart item not deleted',
    CART_ITEM_ALREADY_EXISTS: 'Cart item already exists',
    CART_ITEM_DELETE_FAILED: 'Cart item delete failed',
    CART_ITEM_UPDATE_FAILED: 'Cart item update failed',
    CART_ITEM_CREATE_FAILED: 'Cart item create failed',
    INVALID_CART_ITEM: 'Invalid cart item',
    USER_NOT_FOUND: 'User not found',
    USER_ALREADY_EXISTS: 'User already exists',
    USER_NOT_CREATED: 'User not created',
    USER_NOT_UPDATED: 'User not updated',
    USER_NOT_DELETED: 'User not deleted',
    USER_DELETE_FAILED: 'User delete failed',
    USER_UPDATE_FAILED: 'User update failed',
    USER_CREATE_FAILED: 'User create failed',
    INVALID_USER: 'Invalid user',
    AUTHENTICATION_FAILED: 'Authentication failed',
    INSUFFICIENT_PERMISSIONS: 'Insufficient permissions',
    INVALID_CREDENTIALS: 'Invalid credentials',
}

function customErrorHandler(errorCode){
    const errorMessage = errorMenssages[errorCode] || 'Unknown error'
    return {
        error: errorMessage
    }
}

module.exports = { customErrorHandler }