const Car = require('../models/Car.js');
const faker = require('faker');
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
            .catch(next);
    }

    // [POST ] multiple post /cars/bulk-store

    bulkStore(req, res, next) {
        const items = [];
        let random;
        for (let i = 0; i < 5; i++) {
            random = Math.floor(Math.random() * 2);
            items[i] = new Car({
                name: faker.commerce.productName(),
                desc: faker.lorem.sentence(),
                details: faker.lorem.paragraph(),
                image:
                    random == 0
                        ? 'https://images.unsplash.com/photo-1542362567-b07e54358753?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80'
                        : 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
                video: 'PkkV1vLHUvQ',
            });
        }
        Promise.all(
            items.map((item) => {
                return item.save();
            })
        )
            .then(() => {
                res.redirect('/cars');
            })
            .catch(next);
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
            case 'restore':
                Promise.all(
                    req.body.carIds.map((carId) => {
                        return Car.restore({ _id: carId });
                    })
                )
                    .then(() => {
                        res.redirect('back');
                    })
                    .catch(next);
                break;
            case 'permaDelete':
                Promise.all(
                    req.body.carIds.map((carId) => {
                        return Car.deleteOne({ _id: carId });
                    })
                )
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
