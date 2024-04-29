const mongoose = require('mongoose');

try {
    const dbUser = process.env.DB_USER;
    const dbPassword = process.env.DB_PASSWORD;
    mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster34069.u10anj3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster34069`);
    console.log('Connection succeeded');
} catch (err) {
    console.log('Error in connection ' + err);
}

require('./student.model');
const {mongo} = require("mongoose");