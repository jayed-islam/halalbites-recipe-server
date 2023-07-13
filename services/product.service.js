const { query } = require("express");
const Products = require("../models/Products");
const Order = require("../models/Order");



// without pagination
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

// with pagination
exports.getAllCategoryProductService = async (page, size, query, sortId) => {

    let products;
    let count;

    if (Object.keys(query).length > 0) {
        products = await Products.find(query)
            .sort({ price: sortId })
            .skip(page * size)
            .limit(size);
        count = await Products.countDocuments(query);
    } else {
        products = await Products.find(query)
            .sort({ price: sortId })
            .skip(page * size)
            .limit(size);
        count = await Products.countDocuments();
    }

    return { products, count };
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
