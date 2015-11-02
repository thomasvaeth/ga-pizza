'use strict';
module.exports = function(sequelize, DataTypes) {
  var pizza = sequelize.define('pizza', {
    name: DataTypes.STRING,
    yelpId: DataTypes.STRING,
    city: DataTypes.STRING,
    rating: DataTypes.DECIMAL,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL
  }, {
    classMethods: {
      associate: function(models) {
        models.pizza.belongsToMany(models.user, {through: 'usersPizzas'})
      }
    }
  });
  return pizza;
};