const express = require('express');
const fs = require('fs').promises;

const cartRouter = express.Router();

// Ruta raíz para crear un nuevo carrito
cartRouter.post('/', async (req, res) => {
  try {
    // Leer el archivo carts.json
    const data = await fs.readFile('./database/carts.json', 'utf8');
    const carts = JSON.parse(data);

    // Obtener el último ID de carrito presente en el array
    let lastCartId = 0;
    if (carts.length > 0) {
      const lastCart = carts[carts.length - 1];
      lastCartId = parseInt(lastCart.id);
    }

    // Generar el nuevo ID para el carrito incrementando en 1 al último ID
    const newCartId = (lastCartId + 1).toString();

    // Crear el nuevo carrito con productos vacíos
    const newCart = {
      id: newCartId,
      products: []
    };

    // Agregar el nuevo carrito al array de carritos
    carts.push(newCart);

    // Guardar los carritos actualizados en el archivo carts.json
    await fs.writeFile('./database/carts.json', JSON.stringify(carts, null, 2), 'utf8');

    // Responder con el nuevo carrito creado
    res.status(201).json(newCart);
  } catch (error) {
    console.error('Error al crear el carrito', error);
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

// Ruta para obtener un carrito por ID
cartRouter.get('/:cid', async (req, res) => {
  try {
    // Leer el archivo carts.json
    const data = await fs.readFile('./database/carts.json', 'utf8');
    const carts = JSON.parse(data);

    // Obtener el ID del carrito desde los parámetros de la URL
    const cartId = req.params.cid;

    // Buscar el carrito con el ID correspondiente
    const cart = carts.find((c) => c.id === cartId);

    if (cart) {
      // Si se encuentra el carrito, responder con los datos del carrito
      res.json(cart);
    } else {
      // Si no se encuentra el carrito, responder con un mensaje de error
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el carrito', error);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});
// Ruta para agregar un producto al carrito
cartRouter.post('/:cid/product/:pid', async (req, res) => {
  try {
    // Leer el archivo carts.json
    const data = await fs.readFile('./database/carts.json', 'utf8');
    const carts = JSON.parse(data);

    // Obtener el ID del carrito y del producto desde los parámetros de la URL
    const cartId = req.params.cid;
    const productId = req.params.pid;

    // Buscar el carrito con el ID correspondiente
    const cart = carts.find((c) => c.id === cartId);

    if (cart) {
      // Verificar si el producto ya existe en el carrito
      const existingProduct = cart.products.find((p) => p.product === productId);

      if (existingProduct) {
        // Si el producto ya existe, incrementar la cantidad
        existingProduct.quantity++;
      } else {
        // Si el producto no existe, agregarlo al carrito con una cantidad inicial de 1
        cart.products.push({
          product: productId,
          quantity: 1
        });
      }

      // Guardar los carritos actualizados en el archivo carts.json
      await fs.writeFile('./database/carts.json', JSON.stringify(carts, null, 2), 'utf8');

      // Responder con el carrito actualizado
      res.json(cart);
    } else {
      // Si no se encuentra el carrito, responder con un mensaje de error
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    console.error('Error al agregar el producto al carrito', error);
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});

module.exports = cartRouter;
