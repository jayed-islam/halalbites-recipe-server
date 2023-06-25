const { query } = require("express");
const Products = require("../models/Products");

exports.getAllProductService = async (page, size, query) => {

    let products;
    let count;

    if (Object.keys(query).length > 0) {
        products = await Products.find(query)
            .sort({ createdAt: 1 })
            .skip(page * size)
            .limit(size);
        count = await Products.countDocuments(query);
    } else {
        products = await Products.find(query)
            .sort({ createdAt: 1 })
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
