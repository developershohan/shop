import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";

// create Product
const createProduct = async (reqData) => {
  try {
    let topLevel = await Category.findOne({ name: reqData.topLevelCategory });

    if (!topLevel) {
      topLevel = new Category({
        name: reqData.topLevelCategory,
        parentCategory: null,
        level: 1,
      });
      await topLevel.save();
    }
    let secondLevel = await Category.findOne({
      name: reqData.secondLevelCategory,
      parentCategory: topLevel._id,
    });
    if (!secondLevel) {
      secondLevel = new Category({
        name: reqData.secondLevelCategory,
        parentCategory: topLevel._id,
        level: 2,
      });
      await secondLevel.save();
    }
    let thirdLevel = await Category.findOne({
      name: reqData.thirdLevelCategory,
      parentCategory: secondLevel._id,
    });
    if (!thirdLevel) {
      thirdLevel = new Category({
        name: reqData.thirdLevelCategory,
        parentCategory: secondLevel._id,
        level: 3,
      });
      await thirdLevel.save();
    }
    const product = new Product({
      title: reqData.title,
      description: reqData.description,
      price: reqData.price,
      discountedPrice: reqData.discountedPrice,
      discountedPercent: reqData.discountedPercent,
      quantity: reqData.quantity,
      brand: reqData.brand,
      color: reqData.color,
      size: reqData.size,
      imageUrl: reqData.imageUrl,
      ratings: reqData.ratings,
      reviews: reqData.reviews,
      numRatings: reqData.numRatings,
      category: thirdLevel._id,
    });

    return await product.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

// delete product
const deleteProduct = async (productId) => {
  try {
    const product = await Product.findProductById(productId);
    await Product.findByIdAndDelete(product._id);
    return "product deleted successfully";
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

// update product
const updateProduct = async (productId, reqData) => {
  return await Product.findByIdAndUpdate(productId, reqData);
};

// findProductById
const findProductById = async (id) => {
  const product = await Product.findById(id).populate("category").exec();
  if (!product) {
    throw new Error("Product not found: " + id);
  }
  return product;
};

// get all products
// get all products
const getAllProducts = async (reqQuery) => {
  try {
    let {
      category,
      color,
      sizes,
      minPrice,
      maxPrice,
      minDiscount,
      sort,
      stock,
      pageNumber,
      pageSize,
    } = reqQuery;

    pageSize = pageSize || 10;

    let query = Product.find().populate("category");

    // color
    if (color) {
      const colorSet = new set(
        color.split(",").map((color) => color.trim().toLowerCase())
      );
      const colorRegex =
        (await colorSet.size) > 0
          ? new RegExp([...colorset].join("|"), "i")
          : null;

      query = query.where("color").regex(colorRegex);
    }

    // minPrice & maxPrice
    if (minPrice && minPrice) {
      query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
    }

    // minDiscount
    if (minDiscount) {
      query = query.where("discountedPersent").gt(minDiscount);
    }

    // stock
    if (stock) {
      if (stock == "in_stock") {
        query = query.where("quantity").gt(0);
      } else if (stock == "out_of_stock") {
        query = query.where("quantity").lt(1);
      }
    }

    // sort
    if (sort) {
      const sortDirection = sort === "price_high" ? -1 : 1;
      query = query.sort({ discountedPrice: sortDirection });
    }

    const totalProducts = await Product.countDocuments(query);

    const skip = (pageNumber - 1) * pageSize;
    query = query.skip(skip).limit(pageSize);

    const products = await query.exec();

    return {
      content: products,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalProducts / pageSize),
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// create multiple products
const createMultipleProducts = async (products) => {
  for (let product of products) {
    await createProduct(product);
  }
};

export default {
  createProduct,
  deleteProduct,
  updateProduct,
  findProductById,
  getAllProducts,
  createMultipleProducts,
};
