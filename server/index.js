const express = require('express')
require("dotenv").config()
const session = require("express-session")
const swagController = require('./controllers/swagController')
const checkForSession = require('./middlewares/checkForSession')
const authController = require('./controllers/authController')
const cartController = require('./controllers/cartController');
const searchController = require('./controllers/searchController');

const app = express();

let { SERVER_PORT, SESSION_SECRET} = process.env


app.use(express.json())
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
);
app.use(checkForSession)

app.post("/api/login", authController.login)
app.post("/api/register", authController.register)
app.post("/api/signout", authController.signout)
app.get("/api/user", authController.getUser)


app.post("/api/cart/checkout", cartController.checkout)
app.post("/api/cart/:id", cartController.add)
app.delete("/api/cart/:id", cartController.delete)

app.get("/api/search", searchController.search)



app.get('/api/swag', swagController.read)










app.listen(SERVER_PORT, () => {
    console.log(`App is Listening on ${SERVER_PORT}`)
})
