const TransactionModel = require("../models/Transaction");
const express = require("express");
const mongoose = require("mongoose");

const getAllTransactions = (req, res, next) => {
    TransactionModel.find({})
    .then(
        (transactions) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(transactions);
        },
        (err) => next(err)
    )
    .catch((err) => next(err));
}


const getTransactionById = (req, res, next) => {
    const {id} = req.params;

    TransactionModel.findById(id)
    .then(
        (transaction) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(transaction);
        },
        (err) => next(err)
    )
    .catch((err) => next(err));

}

const createTransaction = (req, res, next) => {
    const {To, Value, Description, Status, Contract} = req.body;
    TransactionModel.create(
        {
            To,
            Value,
            Description,
            Status,
            Contract
        }
    )
    .then(
        (transaction) => {
            console.log("Transaction created", transaction);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(transaction);
        },
        (err) => next(err)
    )
    .catch((err) => next(err));
}

const updateTransactionById = (req, res, next) => {
    const {id} = req.params;
    const updateData =  req.body;

    TransactionModel.findByIdAndUpdate(
        id,
        updateData,
        {new: true}
    )
    .then(
        (transaction) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(transaction);
        },
        (err) => next(err)
    )
    .catch((err) => next(err));
}

const deleteTransactionById = (req, res, next) => {
    const {id} = req.params;
    TransactionModel.findByIdAndDelete(id)
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
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransactionById,
    deleteTransactionById
}