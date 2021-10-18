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
                res.redirect('/me/stored/cars');
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
    // [PUT] cars/:id
    update(req, res, next) {
        Car.updateOne({ _id: req.params.id }, req.body)
            .then(res.redirect('/me/stored/cars'))
            .catch(next);
    }

    // [PATCH] cars/:id/restore

    restore(req, res, next) {
        Car.restore({ _id: req.params.id })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }

    //[DELETE] cars/:id
    delete(req, res, next) {
        Car.deleteById(req.params.id)
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
    // [DELETE] cars/:id/permanent
    deletePermanently(req, res, next) {
        Car.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
    // [POST] cars/handle-form-actions

    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Car.deleteById(req.body.carIds)
                    .then(() => {
                        res.redirect('back');
                    })
                    .catch(next);
                break;
            default:
                res.json({ message: 'ERROR 404! ACTION NOT FOUND' });
        }
    }
}

module.exports = new CarsController();
