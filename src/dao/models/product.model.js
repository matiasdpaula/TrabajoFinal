import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products'

const productsSchema = new mongoose.Schema({
    title:String,
    description:String,
    category:String,
    price:Number,
    status:Boolean,
    thumbnails:Array,
    code:String,
    stock:Number,
    owner : { 
        type: String,
        default: "admin" 
    }
})


productsSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection , productsSchema)