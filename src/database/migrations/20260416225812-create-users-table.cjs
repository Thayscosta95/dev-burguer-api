/**'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', { 
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID, //códigos com numeros e letras, ele vai ser unico
        defaultValue: Sequelize.UUIDV4, //gera um código aleatório
      },
      name: {
        type: Sequelize.STRING, //somente texto
        allowNull: false, //não pode ser nulo, não pode criar a conta sem o nome        
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, //não pode ter dois emails iguais
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      admin: {
        type: Sequelize.BOOLEAN, 
        defaultValue: false, //por padrão, o usuário não é admin
      },
        created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        }
    
    });
     
  },

  async down (queryInterface, Sequelize) {
    
  await queryInterface.dropTable('users');
    
  }
};
