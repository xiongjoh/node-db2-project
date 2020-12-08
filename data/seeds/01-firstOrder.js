
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {vin:'WBADW3C54BE439570', make:'honda', model:'civic', mileage:250156, transmission:'manual' },
        {vin:'2GTEK638071637649', make:'ford', model:'f-150', mileage:105657, status:'salvage' },
        {vin:'1G2MB35B27Y128635', make:'toyota', model:'tacoma', mileage:89875, status:'clean', transmission:'auto'},
        {vin:'JHMBA5429GC107599', make:'toyota', model:'rav4', mileage:58325 },
      ]);
    });
};
