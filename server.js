const express = require('express')
const tasksRoutes = require('./routes/tasksRoutes.js')


const sequelize = require('./db.js')
const app = express()
const PORT = 3000
app.use(express.json())

app.use('/tasks/', tasksRoutes.router) 


sequelize
    .sync()
    .then(() => {
        console.log('database sincronizzato');
    app.listen(PORT, () => {
        console.log('server avviato su http://localhost:', PORT);
    })
    })
.catch((error) => {
    console.error('errore durante la sincronizzazione:', error);
});