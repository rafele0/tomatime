const {Sequelize} = require('sequelize')
const {CREDENTIALS} = require('./credentials')

const sequelize = new Sequelize(CREDENTIALS.database, CREDENTIALS.username, CREDENTIALS.password, {
    host :'localhost',
    dialect : 'mysql'
});

sequelize
    .authenticate()
    .then(()=> {
        console.log('Connessione al database stabilita con successo.');
    })
    .catch((error) => {
        console.error('impossibile connettersi al database:', error);
    })
module.exports = sequelize; 