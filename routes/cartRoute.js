const express = require("express");
const cartRouter = express.Router();
const cartController = require("../controller/cartController.js");

cartRouter.route("/").get(cartController.getAllCarts);
cartRouter.route("/:id").get(cartController.getCart);
cartRouter.route("/AddToCart/:id").post(cartController.addToCart);
cartRouter.route("/RemoveToCart/:id").delete(cartController.removeToCart);
cartRouter.route("/UpdateQuantity/:id").put(cartController.updateQuantity); 
module.exports = cartRouter;
