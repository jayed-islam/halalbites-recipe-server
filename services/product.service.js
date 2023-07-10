const { query } = require("express");
const Products = require("../models/Products");
const Order = require("../models/Order");


exports.getAllProductService = async (query) => {
    let products;
    let count;

    if (Object.keys(query).length > 0) {
        products = await Products.find(query)
            .sort({ createdAt: 1 })
            .exec();

        count = await Products.countDocuments(query).exec();
    } else {
        products = await Products.find(query)
            .sort({ createdAt: 1 })
            .exec();

        count = await Products.countDocuments().exec();
    }

    return { products, count };
};


exports.getAllOrdersService = async (page, size, query) => {

    let orders;
    let count;

    if (Object.keys(query).length > 0) {
        orders = await Order.find(query)
            .sort({ createdAt: 1 })
            .skip(page * size)
            .limit(size);
        count = await Order.countDocuments(query);
    } else {
        orders = await Order.find(query)
            .sort({ createdAt: 1 })
            .skip(page * size)
            .limit(size);
        count = await Order.countDocuments();
    }

    return { orders, count };
};
































// exports.getAllProgramServic = async (page, size, query, search) => {
//     try {
//         let programsQuery = ""

//         if (search) {
//             programsQuery = programsQuery.find({ applicant_mobile: { $regex: search, $options: "i" } });
//         }

//         const programs = await programsQuery.skip(page * size).limit(size);
//         const count = await Programe.countDocuments(query);

//         return { programs, count };
//     } catch (error) {
//         throw error;
//     }
// };
