const Category = require("../models/ProductCategory");
const express = require("express");
const mongoose = require("mongoose");

const getAllPCategory = (req, res, next) => {
    Category.find({})
        .then(
            (category) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(category);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
}

const createPCategory = (req, res, next) => {
    const { categoryName } = req.body;
    Category.create(
        {
            categoryName
        }
    )
        .then(
            (category) => {
                console.log("Category created", category);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(category);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
}

const deleteAllPCategory = (req, res, next) => {
    Category.deleteMany({})
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

module.exports = {
    getAllPCategory,
    createPCategory,
    deleteAllPCategory,
}
