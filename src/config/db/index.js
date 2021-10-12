const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/myapp_dev');
        console.log('CONNECTED');
    } catch (error) {
        console.log('FAILED');
    }
}

module.exports = { connect };
