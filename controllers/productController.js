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
