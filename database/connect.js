const mongoose = require('mongoose');
const urlConnection = require('./config.js');
const RoleModel = require('../models/Role.js');
mongoose.set('strictQuery', true);
// const roleSchema = new mongoose.Schema({
//     _id: Number,
//     roleName: String
// });

// Register the "Role" model with the defined schema


// Connect to the database and perform operations
const connection = async () => {
    try {
        await mongoose.connect(urlConnection);
        console.log('Connection successful');

        // Drop the "roles" collection
        await mongoose.connection.db.dropCollection('roles');
        // console.log('Dropped "roles" collection');

        // Insert new data into the "roles" collection
        await RoleModel.create({
            _id: 1,
            Name: 'customer'
        });
        // console.log('Inserted new data into "roles" collection');

        // Rest of your code...

    } catch (error) {
        console.log(error);
    }
};
module.exports = connection;