import mongoose from "mongoose"

const productsCollection = "products"

const productsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: { type: String, required: true },
    carru1: { type: String, required: true },
    minimo: { type: Number, required: true },
    availability: {type: Boolean,required: true}
});


export const productsModel  = mongoose.model(productsCollection, productsSchema)
