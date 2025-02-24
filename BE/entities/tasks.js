const { DataTypes } = require('sequelize');
const sequelize = require('../db.js')

const tasks = sequelize.define('tasks', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    title: {
        type : DataTypes.STRING,
        allowNull : false
    },
    description:{
        type : DataTypes.STRING,
        allowNull : true
    },
    time : {
        type : DataTypes.DATE,
        allowNull : false
    },
    state : {
        type : DataTypes.STRING,
        allowNull : false
    },
    id_user : {
        type : DataTypes.INTEGER,
        allowNull : false
    }
})

module.exports = {tasks}