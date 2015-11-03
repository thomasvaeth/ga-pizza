'use strict';
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define('favorite', {
    yelpId: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.favorite.belongsToMany(models.user, {through: 'usersFavorites'})
      }
    }
  });
  return favorite;
};