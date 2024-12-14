const Product = require("../models/Product");

exports.addProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const colors = JSON.parse(req.body.colors || '[]');
    
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const product = await Product.create({ 
      name, 
      description, 
      price: Number(price),
      category,
      stock: Number(stock),
      colors,
      image,
      status: 'active'
    });

    res.status(201).json({ 
      success: true,
      product: product._id 
    });
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { 
      new: true,
      runValidators: true 
    });
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
}; 