const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('tomatime', 'tomatime', 'tomatime', {
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