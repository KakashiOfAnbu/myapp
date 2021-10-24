const Car = require('../models/Car.js');
const { multipleMongooseToObj } = require('../../utils/mongoose');
const { mongooseToObj } = require('../../utils/mongoose');
class MeController {
    // [GET] /me/strored/cars
    storeCars(req, res, next) {
        let findCars = Car.find({});
        if (req.query.hasOwnProperty('_sort')) {
            findCars = Car.find({}).sort({
                [req.query.column]: req.query.type,
            });
        }
        Promise.all([Car.countDocumentsDeleted(), findCars])
            .then(([deletedCount, cars]) => {
                res.render('me/store-car', {
                    deletedCount,
                    cars: multipleMongooseToObj(cars),
                });
            })
            .catch(next);
    }

    trashView(req, res, next) {
        Car.findDeleted({})
            .then((cars) => {
                res.render('me/trash', {
                    cars: multipleMongooseToObj(cars),
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();
