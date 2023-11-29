const express = require('express')

const cookieParser = require('cookie-parser')
const session = require('express-session')

const FileStore = require('session-file-store')
const MongoStore = require('connect-mongo')

const productsRouter = require("./router/products-router");
const productViewRouter = require("./router/productViewRouter");
const cartRouter = require("./router/cart-router");
const cartViewRouter = require("./router/cartViewRouter");
const sessionRouter = require('./router/session-router')
const sessionViewRouter = require('./router/session-view-router')
const messageRouter = require("./router/messageRouter");
const ticketRouter = require("./router/ticketRouter");
const mockingRouter = require("./router/mockingRouter");
const userRouter = require("./router/userRouter")
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");

const app = express();

const fileStorage = FileStore(session)

const logger = require('./logger')

const passport = require('./config/initializePassport');

// Configuración handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");



app.use(cookieParser('secretkey'))

const config = require('./config/config')

const MONGODB_CONNECT =
  `mongodb+srv://${config.mongo.user}:${config.mongo.password}@cluster0.c9jlz11.mongodb.net/${config.mongo.name}?retryWrites=true&w=majority`;
mongoose
  .connect(MONGODB_CONNECT)
  .then(() => console.log("conexion DB"))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
  store: MongoStore.create({
    mongoUrl: MONGODB_CONNECT,
    ttl: 180
  }),
  secret: `${config.session.secret}`,
  resave: true,
  saveUninitialized: true
}))


app.use(passport.initialize())
app.use(passport.session())

if (proccess.env.NODE_ENV !== 'production') {
  app.use('/api', mockingRouter) 
}
 
app.use("/api/products", productsRouter);
app.use("/products", productViewRouter);
app.use("/api/carts", cartRouter);
app.use("/cart", cartViewRouter);
app.use('/api/sessions', sessionRouter)
app.use('/sessions', sessionViewRouter)
app.use('/api/users', userRouter)
app.use("/api/messages", messageRouter);
app.use("/messages/new", (req, res) =>
  res.render("messageForm", { message: {} })
);
app.use("/messages/edit/:id", messageRouter);
app.use("/api/tickets", ticketRouter);

app.get('/loggerTest', (req, res) => {
  logger.debug('Este es un mensaje de depuración.');
  logger.info('Este es un mensaje informativo.');
  logger.warn('Este es un mensaje de advertencia.');
  logger.error('Este es un mensaje de error.');
  res.send('Registros generados. Verifica los archivos de registro.');
});

app.get("/", (req, res) => {
  res.json({
    status: "running",
  });
});

const PORT = `${config.url.port}`;
app.listen(PORT, () => console.log(`servidor corriendo en puerto ${PORT}`));

