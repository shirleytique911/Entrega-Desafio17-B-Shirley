import express from "express"
import { engine } from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js"


import mongoose from "mongoose"
import cartsRouter from "./router/carts.routes.js"
import productsRouter from "./router/product.routes.js"
import ProductManager from "./controllers/ProductManager.js"
import CartManager from "./controllers/CartManager.js"

const app = express ()
const PORT = 8080
const httpServer = app.listen(PORT,()=> console.log("Listen puerto 8080"))
const product = new ProductManager
const cart = new CartManager


mongoose.connect("mongodb+srv://shirleytique911:GKZraArQ50QuepXc@cluster0.dvtsniz.mongodb.net/?retryWrites=true&w=majority")
.then(()=> {
    console.log("Conectado a la base de datos")
})
.catch(error=>{
    console.error("Error al intentar conectarse a la base de datos", error)
})


app.use(express.json())
app.use(express.urlencoded({extended: true}))


//Rutas CRUD con Postman
app.use("/api/carts", cartsRouter)
app.use("/api/prod", productsRouter)


//handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))
app.set("views", __dirname+"/views")


//static
app.use("/", express.static(__dirname + "/public"))


//Chat
app.get("/chat", (req, res)=> {
    res.render("chat", {
        title: "Chat con Mogoose"
    })
})


app.get("/products", async (req, res) => {
    let allProducts = await product.getProducts()
    allProducts = allProducts.map(product => product.toJSON())
    res.render("home", {
        title: "Dracarnis | Productos",
        products : allProducts
    })
})


app.get("/products/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const productDetails = await product.getProductById(productId);
        if (productDetails) {
          
            const price = typeof productDetails.price === 'number' ? productDetails.price : 0;
            const stock = typeof productDetails.stock === 'number' ? productDetails.stock : 0;
            const minimo = typeof productDetails.minimo === 'number' ? productDetails.minimo : 0;

            const cleanedProduct = {
                title: productDetails.title,
                description: productDetails.description,
                price: price,
                stock: stock,
                minimo: minimo,
                category: productDetails.category,
                thumbnails: productDetails.thumbnails,
            
            };
            
            res.render("prod", { product: cleanedProduct });
        } else {
           
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});


app.get("/cart/:cid", async (req, res) => {
    let id = req.params.cid;
    let cartWithProducts = await cart.getCartWithProducts(id);
    res.render("cart", {
        title: "Vista Carro",
        products: cartWithProducts.products, 
    });
});



//shirley tique
