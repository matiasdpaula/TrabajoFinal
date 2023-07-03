import mongoose from "mongoose";

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    products: {
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'products',
        },
        quantity:Number,
        _id:0
    }
})

export const cartModel = mongoose.model(cartCollection , cartSchema)