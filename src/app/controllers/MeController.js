const Car = require('../models/Car.js');
const { multipleMongooseToObj } = require('../../utils/mongoose');
const { mongooseToObj } = require('../../utils/mongoose');
class MeController {
    // [GET] /me/strored/cars
    storeCars(req, res, next) {
        Car.find({})
            .then((cars) => {
                res.render('me/store-car', {
                    cars: multipleMongooseToObj(cars),
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();
