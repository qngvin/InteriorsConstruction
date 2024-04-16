const Cart = require("../models/Cart.js");
const CartModel = require("../models/Cart.js");
const CartDetailModel = require("../models/CartDetail");

const getAllCarts = async (req, res, next) => {
  try {
    const allCarts = await CartModel.find();
    const detailedCarts = [];

    for (const cart of allCarts) {
      const cartDetails = await CartDetailModel.find({ Cart: cart._id })
        .populate("Product")
        .exec();

      const detailedCart = {
        cart: cart.toObject(),
        cartDetails,
      };

      detailedCarts.push(detailedCart);
    }

    res.status(200).json(detailedCarts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCart = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const userCart = await CartModel.findOne({ User: userId });

    if (!userCart) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy giỏ hàng cho người dùng này" });
    }

    const cartDetails = await CartDetailModel.find({ Cart: userCart._id })
      .populate("Product")
      .exec();

    let totalPrice = 0;

    cartDetails.forEach((cartDetail) => {
      totalPrice += cartDetail.Product.Price * cartDetail.Quantity;
    });
    const cartWithDetails = {
      cart: userCart.toObject(),
      cartDetails: cartDetails.map((cartDetail) => ({
        ...cartDetail.toObject(),
        price: cartDetail.Product.Price * cartDetail.Quantity,
      })),
      totalPrice,
    };

    res.status(200).json(cartWithDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { productId, quantity } = req.body;

    let userCart = await CartModel.findOne({ User: userId });

    if (!userCart) {
      userCart = new CartModel({ User: userId });
      await userCart.save();

      const cartDetail = new CartDetailModel({
        Quantity: quantity,
        Cart: userCart._id,
        Product: productId,
      });

      await cartDetail.save();

      return res
        .status(200)
        .json({ message: "Cart and item added to cart successfully" });
    } else {
      let cartDetail = await CartDetailModel.findOne({
        Cart: userCart._id,
        Product: productId,
      });

      if (cartDetail) {
        cartDetail.Quantity += quantity;
      } else {
        cartDetail = new CartDetailModel({
          Quantity: quantity,
          Cart: userCart._id,
          Product: productId,
        });
      }

      await userCart.save();
      await cartDetail.save();

      return res
        .status(200)
        .json({ message: "Item added to cart successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const removeToCart = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { productId } = req.body;

    let userCart = await CartModel.findOne({ User: userId });

    if (!userCart) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy giỏ hàng cho người dùng này" });
    }

    let cartDetail = await CartDetailModel.findOne({
      Cart: userCart._id,
      Product: productId,
    });

    if (!cartDetail) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
    }

    await cartDetail.remove();

    await userCart.save();

    return res
      .status(200)
      .json({ message: "Item removed from cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateQuantity = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { productId, quantity } = req.body;
    const userCart = await CartModel.findOne({ User: userId });
    if (!userCart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }
    const cartDetail = await CartDetailModel.findOne({
      Cart: userCart._id,
      Product: productId,
    });
    if (!cartDetail) {
      return res
        .status(404)
        .json({ message: "Sản phẩm không tồn tại trong giỏ hàng" });
    }
    cartDetail.Quantity += quantity;
    await cartDetail.save();
    res.status(200).json({ message: "Cập nhật số lượng sản phẩm thành công" });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
module.exports = {
  getCart,
  addToCart,
  removeToCart,
  updateQuantity,
  getAllCarts,
};
