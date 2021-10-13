const Car = require('../models/Car.js');
const { multipleMongooseToObj } = require('../../utils/mongoose');
const { mongooseToObj } = require('../../utils/mongoose');
class CarsController {
    // [GET] /cars
    index(req, res, next) {
        Car.find({})
            .then((cars) => {
                res.render('cars/list', {
                    cars: multipleMongooseToObj(cars),
                });
            })
            .catch((error) => {
                next(error);
            });
    }
    // [GET]  /cars/add
    add(req, res, next) {
        res.render('cars/add');
    }
    // [POST] /cars/store
    store(req, res, next) {
        const car = new Car(req.body);
        car.save()
            .then(() => {
                res.redirect('/cars');
            })
            .catch((error) => {});
    }

    // [GET] /cars/:slug
    show(req, res, next) {
        Car.findOne({ slug: req.params.slug })
            .then((car) => {
                res.render('cars/show', { car: mongooseToObj(car) });
            })
            .catch((error) => {
                next(error);
            });
    }
    // [GET] cars/:id/edit
    edit(req, res, next) {
        Car.findById(req.params.id)
            .then((car) => {
                res.render('cars/edit', { car: mongooseToObj(car) });
            })
            .catch(next);
    }
    // [PATCH] cars/:id
    update(req, res, next) {
        Car.updateOne({ _id: req.params.id }, req.body)
            .then(res.redirect('/me/stored/cars'))
            .catch(next);
    }
}

module.exports = new CarsController();
