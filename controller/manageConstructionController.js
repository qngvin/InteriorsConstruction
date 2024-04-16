const ManageConstructionModel = require("../models/ManageConstruction");

const getAllConstruction = (req, res, next) => {
    ManageConstructionModel.find({})
    .then(
        (constructions) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(constructions);
        },
        (err) => next(err)
    )
    .catch((err) => next(err));
}

const getConstructionByConstructionId = (req, res, next) => {
    const {constructionId} = req.params;
    ManageConstructionModel.findById(constructionId)
    .then(
        (transaction) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "transaction/json");
            res.json(transaction);
        },
        (err) => next(err)
    )
    .catch((err) => next(err));
}

const getConstructionByUserId = (req, res, next) => {
    const {UserId} = req.params;

    ManageConstructionModel.find({User: UserId})
    .then(
        (construction) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(construction);
        },
        (err) => next(err)
    )
}

const createConstruction = (req, res, next) => {
    const { Description, Image, Status, User } = req.body;
    ManageConstructionModel.create(
        {
            Description, Image, Status, User
        }
    )
    .then(
        (construction) => {
            console.log("Construction created", construction);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(construction);
        },
        (err) => next(err)
    )
    .catch((err) => next(err));
}

const updateConstructionByConstructionId = (req, res, next) => {
    const {constructionId} = req.params;
    const updateData = req.body;

    ManageConstructionModel.findByIdAndUpdate(
        constructionId, updateData, {new: true}
    )
    .then(
        (construction) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(construction);
        },
        (err) => next(err)
    )
    .catch((err) => next(err));
}

const deleteConstructionByConstructionId = (req, res, next) => {
    const {constructionId} = req.params;

    ManageConstructionModel.findByIdAndDelete(constructionId)
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
    getAllConstruction,
    getConstructionByConstructionId,
    getConstructionByUserId,
    createConstruction,
    updateConstructionByConstructionId,
    deleteConstructionByConstructionId
}
