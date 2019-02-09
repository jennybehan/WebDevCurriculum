'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Author', [{
        name: 'testUser01',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()'),
      },
      {
        name: 'testUser02',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()'),
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};