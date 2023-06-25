const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
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
        confirmationToken: String
    },
    {
        timestamps: true
    }
)


const Products = mongoose.model("Products", productSchema);
module.exports = Products;