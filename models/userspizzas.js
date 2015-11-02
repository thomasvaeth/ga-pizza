'use strict';
module.exports = function(sequelize, DataTypes) {
  var usersPizzas = sequelize.define('usersPizzas', {
    userId: DataTypes.INTEGER,
    pizzaId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usersPizzas;
};