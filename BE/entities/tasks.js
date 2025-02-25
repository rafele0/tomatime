const { DataTypes } = require('sequelize');
const sequelize = require('../db.js')

const task = sequelize.define('task', {
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
}, {timestamps : true, 
    tableName : 'tasks'
} )

module.exports = {task}