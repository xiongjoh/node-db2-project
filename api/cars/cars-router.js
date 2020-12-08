const express = require('express');

const Car = require('./cars-model');

const router = express.Router();

// middleware
async function checkId(req, res, next) {
    try{
        const { id } = req.params
        const data = await Car.getById(id)
        if(!data) {
            res.status(404).json({message:`could not find car with id ${id}`})
            return
        } else {
            req.carData = data
            next()
        }
    } catch (err) {
        next(err)
    }
}

// endpoints
router.get('/', async (req, res, next) => {
    try {
        const data = await Car.getAll()
        data ? res.status(200).json(data) : res.status(400).json({message:`data not found`})
    } catch(err) {
        next(err)
    }
})
router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const data = await Car.getById(id)
        res.status(200).json(data)
    } catch(err) {
        next(err)
    }
})
router.post('/', async (req, res, next) => {
    try {
        const car = await Car.create(req.body)
        res.status(201).json(car)
    } catch(err) {
        next(err)
    }
})
router.put('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const updatedCar = await Car.update(id, req.body)
        res.status(201).json(updatedCar)
    } catch(err) {
        next(err)
    }
})
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params
    try {

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