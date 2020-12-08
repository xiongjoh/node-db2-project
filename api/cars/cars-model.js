const db = require('../../data/dbConfig')

module.exports = {
    getAll(){
        // select * from cars
        return db('cars')
    },
    getById(id){
        // select * from cars where id = id
        return db('cars').where('id', id).first()
    },
    create(car){
        // insert into cars (car columns) values (values of columns)
        return db('car').insert(car)
        .then(([id]) => {
            return db('car').where('id', id).first()
        })
    },
    update(id, car){
        // update cars set status = 'salvaged'.... where id = id
        return db('car').where('id', id).update(car)
        .then(res => {
            return db('car').where('id', id).first()
        })
    },
    delete(id){
        // delete from cars where id = id
        return db('posts').where('id', id).del()
    },
}