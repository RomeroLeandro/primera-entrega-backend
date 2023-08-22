const express = require("express");

const productsRouter = require("./router/products-router");
const productViewRouter = require("./router/productViewRouter");
const cartRouter = require("./router/cart-router");
const cartViewRouter = require("./router/cartViewRouter");
const messageRouter = require("./router/messageRouter");

const mongoose = require("mongoose");
const handlebars = require("express-handlebars");

const app = express();

// Configuración handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const MONGODB_CONNECT =
  "mongodb+srv://romerodisind:coder2023@cluster0.c9jlz11.mongodb.net/ecommerce?retryWrites=true&w=majority";
mongoose
  .connect(MONGODB_CONNECT)
  .then(() => console.log("conexion DB"))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/products", productsRouter);
app.use("/products", productViewRouter);
app.use("/api/carts", cartRouter);
app.use("/cart", cartViewRouter);
app.use("/api/messages", messageRouter);
app.use("/messages/new", (req, res) =>
  res.render("messageForm", { message: {} })
);
app.use("/messages/edit/:id", messageRouter);

app.get("/", (req, res) => {
  res.json({
    status: "running",
  });
});

const PORT = 8080;
app.listen(PORT, () => console.log(`servidor corriendo en puerto ${PORT}`));

