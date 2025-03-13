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
    last_used : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    },
    exploded : {
        type : DataTypes.INTEGER,
        defaultValue : 0
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
})

module.exports = tomatoes
module.exports = tomatoes