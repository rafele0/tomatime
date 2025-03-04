const { DataTypes } = require('sequelize');
const sequelize = require('../db.js')

const tomatoes = sequelize.define('tomatoes', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull: false
    },
    duration : {
        type : DataTypes.FLOAT,
        allowNull : false
    },
    state : {
        type : DataTypes.STRING,
        allowNull : false
    },
})

module.exports = tomatoes