
exports.up = function(knex) {
  return knex.schema.createTable('cars', table => {
      // id: primary, unique, not null, int, auto increments
      table.increments();
      // vin: unique, not null,
      table.decimal('vin').notNullable().unique();
      // make: not null,
      table.text('make').notNullable();
      // mileage: not null, int
      table.decimal('mileage');
  })
};

exports.down = function(knex) {
    // deletes table if it exists
  return knex.schema.dropTableIfExists('cars')
};
