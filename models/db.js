const mongoose = require('mongoose');

try {
    mongoose.connect(`mongodb+srv://sulavneupane:ewub8E3nTXehkMpa@cluster34069.u10anj3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster34069`);
    console.log('Connection succeeded');
} catch (err) {
    console.log('Error in connection ' + err);
}

require('./student.model');
const {mongo} = require("mongoose");