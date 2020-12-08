const Car = require('../cars/cars-model');

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

function checkCarCreate(req, res, next) {
    const { vin, make, model, mileage, transmission, status } = req.body
    if (!req.body) {
        res.status(400).json({message:'missing a body'})
    } else if (!vin || !make || !model || !mileage) {
        res.status(400).json({message:'Car requires vin, make, model, mileage'})
    } else {
        next()
    }
}

async function checkUpdate(req, res, next) {
    try {
        const { id } = req.params
        const cCar = await Car.getById(id)
        const { vin, make, model} = req.body
        if(!req.body) {
            res.status(400).json({message:'missing a body'})
            return
        } else if (cCar.vin !== vin || cCar.make !== make || cCar.model !== model) {
            console.log(cCar.vin !== vin)
            console.log(cCar.make !== make)
            console.log(cCar.model !== model)
            res.status(400).json({message:'cannot change values of vin, make, model'})
            return
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }

}

module.exports = {
    checkId,
    checkCarCreate,
    checkUpdate
}