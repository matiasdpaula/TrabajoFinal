import mongoose from "mongoose";

const productCollection = 'products'

const productsSchema = new mongoose.Schema({
    title:String,
    description:String,
    category:String,
    price:Number,
    status:Boolean,
    thumbnails:Array,
    code:String,
    stock:Number
})

export const productModel = mongoose.model(productCollection , productsSchema)