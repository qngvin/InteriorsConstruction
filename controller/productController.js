const Product = require("../models/Product");
// const Category = require("../models/ProductCategory");
const express = require("express");
const mongoose = require("mongoose");

const getAllProduct = (req, res, next) => {
    Product.find({})
        .populate("Category")
        .then(
            (product) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(product);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
}

// const createProduct = (req, res, next) => {
//     const {Name, Description, Price, Size, Material, Color, Weigh, Image, Status, Category} = req.body;
//     Product.create(
//         {
//             Name, 
//             Description, 
//             Price, 
//             Size, 
//             Material, 
//             Color, 
//             Weigh, 
//             Image, 
//             Status, 
//             Category
//         }   
//     )
//     .then(
//         (product) => {
//             console.log("Product created", product);
//             res.statusCode = 200;
//             res.setHeader("Content-Type", "application/json");
//             res.json(product);
//         },
//         (err) => next(err)
//     )
//     .catch((err) => next(err));
// }

//Test validate when create
async function createProduct(req, res) {
    const { Name,
        Description,
        Price,
        Size,
        Material,
        Color,
        Weigh,
        Image,
        Status,
        Category } = req.body;
    
    const errors = []; // Errors array
    // Validate
    if (typeof Name !== 'string') {
    errors.push("Name must be string!");
    }
    if (typeof Description !== 'string') {
    errors.push("Description must be string!");
    }
    if (typeof Price !== 'number' || isNaN(Price)) {
    errors.push("Price must be number!");
    }
    if (typeof Size !== 'string') {
    errors.push("Size must be string!");
    }
    if (typeof Material !== 'string') {
    errors.push("Material must be string!");
    }
    if (typeof Color !== 'string') {
    errors.push("Color must be string!");
    }   
    if (typeof Weigh !== 'string') {
    errors.push("Weigh must be string!");
    }
    if (typeof Image !== 'string') {
    errors.push("Image must be string!");
    }
    if (typeof Status !== 'boolean') {
    errors.push("Status must be true or false!");
    }

    // try {
    //     const categoryExists = await Category.exists({ id: Category });
    //     if (!categoryExists) {
    //       errors.push("Category not exists.");
    //     }
    //   } catch (error) {
    //     console.error("Category error:", error);
    //     return res.status(500).json({ message: "Category error" });
    //   }

    if (errors.length > 0) {
    return res.status(400).json({ message: "Error! Product created failed!", errors });
    } // Errors array > 0 -> message + all validate errors 

    try {
        const newProduct = new Product({
            Name,
            Description,
            Price,
            Size,
            Material,
            Color,
            Weigh,
            Image,
            Status,
            Category
        });
        await newProduct.save();
        return res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        console.error("Create err:", error);
        return res.status(500).json({ message: "Create err" });
    }
}

const deleteAllProduct = (req, res, next) => {
    Product.deleteMany({})
        .then(
            (resp) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(resp);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
}

const getProductById = (req, res, next) => {
    const {id} = req.params;

    Product.findById(id)
    .then(
        (product) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(product);
        },
        (err) => next(err)
    )
    .catch((err) => next(err));
}

const updateProductById = (req, res, next) => {
    const {id} = req.params;
    const updateData =  req.body;

    Product.findByIdAndUpdate(
        id,
        updateData,
        {new: true}
    )
    .then(
        (product) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(product);
        },
        (err) => next(err)
    )
    .catch((err) => next(err));
}

const deleteProductById = (req, res, next) => {
    const {id} = req.params;
    Product.findByIdAndDelete(id)
    .then(
        (resp) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(resp);
        }, (err) => next(err)
    )
    .catch((err) => next(err));
}


module.exports = {
    getAllProduct,
    createProduct,
    deleteAllProduct,
    getProductById,
    updateProductById,
    deleteProductById
}