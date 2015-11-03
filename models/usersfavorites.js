'use strict';
module.exports = function(sequelize, DataTypes) {
  var usersFavorites = sequelize.define('usersFavorites', {
    userId: DataTypes.INTEGER,
    favoriteId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usersFavorites;
};