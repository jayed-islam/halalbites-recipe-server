const Order = require("../models/Order");
const Products = require("../models/Products");
const { getAllProductService, getAllOrdersService, getAllCategoryProductService } = require("../services/product.service");

// all products getting
exports.getAllProducts = async (req, res) => {
  try {

    let query = {};

    const { products, count } = await getAllProductService(query);

    res.status(200).send({
      status: "success",
      data: products,
      count: count
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};


exports.getDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = await Products.findById(id);

    if (!productData) {
      return res.status(404).json({
        message: 'Data not found',
        status: 'fail'
      });
    }

    res.status(200).json({
      message: 'Data retrieved successfully',
      status: 'success',
      data: productData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.getProductsByCategoryOLD = async (req, res) => {
  try {
    const { category } = req.query;
    const productData = await Products.find({ category: { $regex: category, $options: 'i' } });

    if (!productData.length) {
      return res.status(404).json({
        message: 'No products found in the specified category',
        status: 'fail'
      });
    }

    res.status(200).json({
      message: 'Products retrieved successfully',
      status: 'success',
      data: productData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// all products getting
// exports.getProductsByCategory = async (req, res) => {
//   try {
//     const { page, size, sortId, min, max } = req.query;
//     const category = req.query.category || null;
//     const search = req.query.search || null;

//     let query = {};

//     if (category && category.length) {
//       query.category = category
//     }

//     if ((min && min.length) || (max && max.length)) {
//       query.price = { $gt: Number(min), $lt: Number(max) };
//     }

//     // if (search && search.length) {
//     //   query.category = { $regex: search, $options: "i" };
//     // }

//     // if (search && search.length) {
//     //   query.name = { $regex: search, $options: "i" };
//     // }
//     // if (search && search.length) {
//     //   const searchRegex = new RegExp(search, 'i');
//     //   query.$or = [
//     //     { name: { $regex: searchRegex } },
//     //     { category: { $regex: searchRegex } },
//     //     { desc: { $regex: searchRegex } }
//     //   ];
//     // }


//     // if (search && search.length) {
//     //   const searchRegex = new RegExp(search, 'i');
//     //   query.$or = [
//     //     { name: searchRegex },
//     //     { category: searchRegex },
//     //     { desc: searchRegex }
//     //   ];
//     // }

//     // if (search && search.length) {
//     //   const searchRegex = new RegExp(search, 'i');
//     //   query.name = { $regex: searchRegex };
//     // }

//     const { products, count } = await getAllCategoryProductService(Number(page), Number(size), query, Number(sortId));

//     res.status(200).send({
//       status: "success",
//       data: products,
//       count: count
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       error,
//     });
//   }
// };

// exports.getProductsByCategory = async (req, res) => {
//   try {
//     const { page, size, sortId } = req.query;
//     const min = req.query.min ? req.query.min : null;
//     const max = req.query.max ? req.query.max : null;
//     const category = req.query.category ? req.query.category : null;
//     const search = req.query.search ? req.query.search : null;


//     let query = {};

//     console.log(category, search, min, max)


//     if (category && category.length) {
//       query.category = category;
//     }
//     else {
//       // if (search && search.length) {
//       const searchRegex = new RegExp(search, 'i');
//       query.$or = [
//         { name: { $regex: searchRegex } },
//         { category: { $regex: searchRegex } },
//         { desc: { $regex: searchRegex } }
//       ];
//       // }
//     }






//     if ((min && min.length) || (max && max.length)) {
//       query.price = { $gt: Number(min), $lt: Number(max) };
//     }


//     const { products, count } = await getAllCategoryProductService(Number(page), Number(size), query, Number(sortId));

//     res.status(200).send({
//       status: "success",
//       data: products,
//       count: count
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       error,
//     });
//   }
// };
// exports.getProductsByCategory = async (req, res) => {
//   try {
//     const { page, size, sortId, min, max, category, search } = req.query;

//     let query = {};

//     console.log(category, search, min, max);

//     if (category && category.length) {
//       query.category = category;
//     }

//     if (search && search.length) {
//       const searchRegex = new RegExp(search, 'i');
//       query.$or = [
//         { name: { $regex: searchRegex } },
//         { category: { $regex: searchRegex } },
//         { desc: { $regex: searchRegex } }
//       ];
//     }

//     if ((min && min.length) || (max && max.length)) {
//       query.price = { $gt: Number(min), $lt: Number(max) };
//     }

//     const { products, count } = await getAllCategoryProductService(Number(page), Number(size), query, Number(sortId));

//     res.status(200).send({
//       status: "success",
//       data: products,
//       count: count
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       error,
//     });
//   }
// };

exports.getProductsByCategory = async (req, res) => {
  try {
    const { page, size, sortId, min, max, category, search } = req.query;

    let query = {};

    if (category !== "null" && category.length) {
      query.category = category;
    }

    if (search !== "null" && search.length) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: { $regex: searchRegex } },
        { category: { $regex: searchRegex } },
        { desc: { $regex: searchRegex } }
      ];
    }

    if ((min && min.length) || (max && max.length)) {
      query.price = { $gt: Number(min), $lt: Number(max) };
    }

    const { products, count } = await getAllCategoryProductService(Number(page), Number(size), query, Number(sortId));

    res.status(200).send({
      status: "success",
      data: products,
      count: count
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};






// all orders
exports.getAllOrders = async (req, res) => {
  try {
    const { page, size } = req.query;

    let query = {};
    const { orders, count } = await getAllOrdersService(Number(page), Number(size), query);

    res.status(200).send({
      status: "success",
      data: orders,
      count: count
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};




// express delivery
exports.getAllExpressDelivery = async (req, res) => {
  try {
    const { page, size } = req.query;

    let query = { deliveryType: "Express-delivery" };
    const { orders, count } = await getAllOrdersService(Number(page), Number(size), query);

    res.status(200).send({
      status: "success",
      data: orders,
      count: count
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

// regular delivery
exports.getAllRegularDelivery = async (req, res) => {
  try {
    const { page, size } = req.query;

    let query = { deliveryType: "Regular-delivery" };
    const { orders, count } = await getAllOrdersService(Number(page), Number(size), query);

    res.status(200).send({
      status: "success",
      data: orders,
      count: count
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};


// get product by id
exports.getDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = await Products.findById(id);

    if (!productData) {
      return res.status(404).json({
        message: 'Data not found',
        status: 'fail'
      });
    }

    res.status(200).json({
      message: 'Data retrieved successfully',
      status: 'success',
      data: productData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
