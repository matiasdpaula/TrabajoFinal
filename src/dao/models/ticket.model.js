import mongoose from "mongoose";

const ticketCollection = 'tickets'

const ticketSchema = new mongoose.Schema({
    code : String,
    purchaser : String,
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
        },
        quantity: Number,
    }],
    amount : Number
})

ticketSchema.set('timestamps', {
    createdAt : "purchase_datetime"
});

export const ticketModel = mongoose.model(ticketCollection , ticketSchema)