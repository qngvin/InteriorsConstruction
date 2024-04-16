const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ENV = require('../config.js');
const AccountModel = require('../models/Account.js');
const UserModel = require('../models/User.js');
const register = async (req, res, next) => {
    try {
        const { phoneNumber, password } = req.body;
        if (password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters long" });
        }
        const existPhone = await AccountModel.findOne({ PhoneNumber: phoneNumber });
        if (existPhone) {
            return res.status(409).json({ error: "Exist phone number" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const account = new AccountModel({
            PhoneNumber: phoneNumber,
            Password: hashedPassword,
        });
        await account.save();

        const user = new UserModel({
            IdAccount: account._id,
        });
        await user.save();

        res.status(201).json({ msg: "Register successfully" });
    } catch (error) {
        // console.error(error); // Log the error for debugging purposes
        res.status(500).json({error : error.message});
        // res.status(500).json(error);
    }
};
const login = async (req, res, next) => {
    try {
        const { phoneNumber, password } = req.body;

        const existPhone = await AccountModel.findOne({ PhoneNumber: phoneNumber });
        if (!existPhone) {
            return res.status(404).send({ error: "Not found" });
        }

        const passwordCheck = await bcrypt.compare(password, existPhone.Password);
        if (!passwordCheck) {
            return res.status(404).send({ error: "Incorrect password" });
        }

        const token = jwt.sign(
            {
                id: existPhone._id,
                PhoneNumber: existPhone.PhoneNumber
            },
            ENV.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).send({
            msg: "Login Successful...!",
            id: existPhone._id,
            token,
            PhoneNumber: existPhone.PhoneNumber
        });
    } catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
};
const changePassword = async (req, res, next) => {
    const { newPassword } = req.body;
    const id = req.account.id;

    // if (password != newPassword) return res.status(400).json({error : "Confirm password wrong"})
    try {
        const account = await AccountModel.findById(id);
        if (!account) return res.status(404).json({ error: "Not found" });
        else {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            account.Password = hashedPassword;
            await account.save();
            return res.status(200).json({ msg: "Change password successfully" })
        }
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: "Server error" });
    }
}
module.exports = {
    register,
    login,
    changePassword,
}
