import db from "../models";

const Product = db.products;
const Review = db.reviews;

// creating a product
const createProduct = async (req, res) => {
  try {
    let productInfo = {
      id: req.body.id,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
    };
    const product = await Product.create(productInfo);
    res.status(200).json({
      data: "Created a new Product",
      message: "Created new product successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create a new product.",
    });
  }
};

// getting all the product

const getAllProduct = async (req, res) => {
  try {
    let products = await Product.findAll({ attributes: ["title", "price"] });
    res.status(200).send(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to retrieve products.",
    });
  }
};

// get single product by id
const getProductById = async (req, res) => {
  try {
    let productId = parseInt(req.params.id);
    if (isNaN(productId)) return res.status(400).json({ msg: "Bad Request" });
    const productById = await Product.findByPk(
      (items) => items.id === productId,
    );
    if (!productById)
      return res.status(404).json({
        msg: "Product not found",
      });
    return res.json({ productById });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to retrieve products by id.",
    });
  }
};

// update product by id
const updateProductById = async (req, res) => {
  try {
    // checking here if the product is there or not
    const productId = parseInt(req.params.id);
    const productExists = await Product.findByPk(productId);
    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    await Product.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update products by id.",
    });
  }
};
