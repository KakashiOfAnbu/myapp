const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Song = new Schema({
    singer: { type: String, maxLength: 100 },
    path: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 600 },
    name: { type: String, maxLength: 255 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Music', Song);
