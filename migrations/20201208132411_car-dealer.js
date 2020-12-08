
exports.up = function(knex) {
  return knex.schema.createTable('cars', table => {
      // id: primary, unique, not null, int, auto increments
      table.increments();
      // vin: unique, not null,
      table.text('vin').notNullable().unique();
      // make: not null,
      table.text('make').notNullable();
      // model: not null,
      table.text('model').notNullable();
      // mileage: not null, int
      table.decimal('mileage').notNullable();
      // transmission type
      table.text('transmission')
      // status of the title
      table.text('status')
  })
};

exports.down = function(knex) {
    // deletes table if it exists
  return knex.schema.dropTableIfExists('cars')
};
