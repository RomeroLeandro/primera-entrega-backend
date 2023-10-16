function generateProduct(id) {
    return {
        _id: id,
    name: `Product ${id}`,
    description: `Description for Product ${id}`,
    price: Math.floor(Math.random() * 100) + 1, 
    stock: Math.floor(Math.random() * 100), 
  };
}

function generateMockProducts() {
    const products = [];
    for (let i = 0; i < 100; i++) {
        products.push(generateProduct(i));
    }
    return products;
}

module.exports = { generateMockProducts };