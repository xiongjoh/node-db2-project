const express = require('express');

const Car = require('./cars-model');
const carMid = require('../middlewares/cars-middlewares')

const router = express.Router();


// endpoints
router.get('/', async (req, res, next) => {
    try {
        const data = await Car.getAll()
        data ? res.status(200).json(data) : res.status(400).json({message:`data not found`})
    } catch(err) {
        next(err)
    }
})
router.get('/:id', carMid.checkId, async (req, res, next) => {
    const { id } = req.params
    try {
        const data = await Car.getById(id)
        res.status(200).json(data)
    } catch(err) {
        next(err)
    }
})
router.post('/', carMid.checkCarCreate, async (req, res, next) => {
    try {
        const car = await Car.create(req.body)
        res.status(201).json(car)
    } catch(err) {
        next(err)
    }
})
router.put('/:id', carMid.checkId, carMid.checkUpdate, async (req, res, next) => {
    const { id } = req.params
    try {
        const updatedCar = await Car.update(id, req.body)
        res.status(201).json(updatedCar)
    } catch(err) {
        next(err)
    }
})
router.delete('/:id', carMid.checkId, async (req, res, next) => {
    const { id } = req.params
    try {
        await Car.delete(id)
        res.json(req.carData)
    } catch(err) {
        next(err)
    }
})
router.use((err, req, res, next) => {
    res.status(500).json({
        message:`Something went wrong`,
        error: err.message,
    })
})

module.exports = router;