const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        images: [
            {
                type: String
            },
            {
                type: String
            },
            {
                type: String
            },
            {
                type: String
            },
            {
                type: String
            },
        ],
        price: {
            type: Number
        },
        review: {
            type: String
        },
        desc: {
            type: String
        },
        category: {
            type: String
        },
        confirmationToken: String
    },
    {
        timestamps: true
    }
)


const Products = mongoose.model("Products", productSchema);
module.exports = Products;