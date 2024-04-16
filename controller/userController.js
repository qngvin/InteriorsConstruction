
const UserModel = require('../models/User.js');
const getAllUser = async (req, res, next) => {
    // let action = req.params.action;
    try {

        const users = await UserModel.find({})
            .sort({ "Name": 1 })
            .populate('IdAccount')
            .populate('IdRole');
        res.status(200).json(
            users
        )
    } catch (error) {
        return res.status(500).json({
            msg: 'Failed'
        })
    }
}

// const createUser = async (req, res, next) => {
//     const { name, address, email, idCard, image, gender } = req.body;
//     let accountId = req.account.id;
//     // console.log(accountId);
//     // debugger
//     try {
//         await UserModel.create({
//             Name: name,
//             Address: address,
//             Email: email,
//             IDCard: idCard,
//             Image: image,
//             Gender: gender,
//             Status: 1,
//             // IdRole : 1, 
//             IdAccount: accountId,
//         }).then(user => {
//             res.status(201).json({
//                 msg: "Create new user sucessfully",
//                 data: user,
//             })
//         }).catch(error => {
//             if (error) res.status(400).json({ error: "Duplicated, cannot create" });
//         })

//     } catch (error) {
//         return res.status(500).json({
//             msg: 'Failed'
//         })
//     }
// }
const getUserById = async (req, res, next) => {
    const id = req.params.id
    try {
        const user = await UserModel.findOne({ _id: id });
        if (user) res.status(200).json(user)
        else res.status(404).json({ msg: "Not Found" });

    } catch (error) {
        return res.status(500).json({
            msg: 'Failed'
        })
    }
}
const updateUser = async (req, res, next) => {
    const { name, address, email, idCard, image, gender } = req.body;
    const id = req.params.id;
    try {
        const user_update = await UserModel.findById(id);
        if (!user_update) {
            return res.status(404).json({ msg: "Not Found" });
        }

        user_update.Name = name || user_update.Name;
        user_update.Address = address || user_update.Address;
        user_update.Email = email || user_update.Email;
        user_update.IDCard = idCard || user_update.IDCard;
        user_update.Image = image || user_update.Image;
        user_update.Gender = gender || user_update.Gender;
        await user_update.save();
        res.status(200).json({
            msg: "Update successfully",
            data: user_update,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: "Duplicated, cannot update" });
        }
        return res.status(500).json({ error: error.message });
    }
};
const setStatusUser = async (req, res, next) => {
    const id = req.params.id;
    const action = req.query.action;

    try {
        const user_update = await UserModel.findById(id);
        if (!user_update) {
            return res.status(404).json({ msg: "Not Found" });
        }
        if (action === 'active') user_update.Status = 1;
        if (action === 'unactive') user_update.Status = 0;

        await user_update.save();

        res.status(200).json({
            msg: "Update successfully",
            data: user_update,
        });
    } catch (error) {
        return res.status(500).json({ msg: 'Failed' });
    }
};
module.exports = {
    getAllUser,
    // createUser,
    setStatusUser,
    getUserById,
    updateUser,
}
