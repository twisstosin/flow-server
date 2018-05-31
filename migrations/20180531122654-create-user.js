'use strict';
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    Name: {
      type: Sequelize.STRING
    },
    Location: {
      type: Sequelize.STRING
    },
    Username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    Password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
}
export function down(queryInterface, Sequelize) {
  return queryInterface.dropTable('Users');
}