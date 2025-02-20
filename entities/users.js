const { DataTypes } = require('sequelize');
const sequelize = require('../db.js')

const users = sequelize.define('users', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    username : {
        type : DataTypes.STRING,
        allowNull : false
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
})

module.exports = {users}