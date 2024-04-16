const ContractModel = require('../models/Contract.js');
const UserModel = require('../models/User.js');
const getUserById = require('../controller/userController.js');
const getAllContract = async (req, res, next) => {
    try {
        const contract = await ContractModel.find({});
        res.status(200).json(contract);
    } catch (error) {
        return res.status(500).json({
            msg: 'Failed'
        })
    }
}

const getContractByName = async (req, res, next) => {
    try {
        const { Name } = req.params;
        await ContractModel.findOne({ Name: name }).then(
            (contract) => {
                res.status(200);
                res.json(contract);
            }
        )
    } catch (error) {
        return res.status(500).json({
            msg: 'Failed'
        })
    }
}

const createContract = async (req, res, next) => {
    try {
        const userId = req.param.id;


        const { name, startDate, endDate, terms, status, description, user } = req.body;
  
        const contract = new ContractModel( {
            Name: name,
            StartDate: startDate,
            EndDate: endDate,
            Terms: terms,
            Status: status,
            Description: description,    
            user: userId
            
        })
        
        await contract.save();
        res.status(201).json(contract);
    } catch (error) {
        // console.error(error); // Log the error for debugging purposeszzzzz
        res.status(500).json({ error: error.message});
        
    }

}
const deleteContractById = (req, res, next ) =>{
    const {id} =req.params;
    ContractModel.findByIdAndDelete(id)
    .then(
        (resp) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(resp);
        }, (err) => next(err)
    ).catch((err) => next(err));
} 


module.exports = {
    getAllContract,
    getContractByName,
    createContract,
    deleteContractById,
}