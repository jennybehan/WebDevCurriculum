'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Memo', [{
        title: '제목1',
        content: '내용1',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()'),
        author_name: 'testUser01'
      },
      {
        title: '제목2222',
        content: '내용2222',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()'),
        author_name: 'testUser02'
      },
      {
        title: '제목3333',
        content: '내용3333',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()'),
        author_name: 'testUser02'
      }
    ]);
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