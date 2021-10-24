const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Car = new Schema(
    {
        _id: { type: Number },
        name: { type: String, required: true, maxLength: 100 },
        desc: { type: String, maxLength: 600 },
        details: { type: String, maxLength: 600 },
        image: { type: String, maxLength: 255 },
        video: { type: String, required: true, maxLength: 600 },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        _id: false,
        timestamps: true,
    }
);

mongoose.plugin(slug);
Car.plugin(AutoIncrement);
Car.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('Course', Car);
