'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      models.Comments.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }     
      })

      models.Comments.belongsTo(models.Post, {
        foreignKey: {
          allowNull: false
        }     
      })



    }
  };
  Comments.init({
    Content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    userName: DataTypes.STRING,
    postId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};