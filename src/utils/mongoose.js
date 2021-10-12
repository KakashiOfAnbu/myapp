module.exports = {
    multipleMongooseToObj(array) {
        return array.map((item) => item.toObject());
    },
    mongooseToObj(item) {
        return item ? item.toObject() : item;
    },
};
