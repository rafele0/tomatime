const express = require('express')
const tasksRoutes = require('./routes/tasksRoutes.js')
const cors = require('cors')
const usersRoutes = require('./routes/usersRoutes.js')


const sequelize = require('./db.js')
const { users } = require('./entities/users.js')
const app = express()
const PORT = 3000
app.use(express.json())
app.use(cors())

app.use('/tasks', tasksRoutes) 
app.use('/users', usersRoutes)

sequelize
    .sync({alter:true})
    .then(() => {
        console.log('database sincronizzato');
    app.listen(PORT, () => {
        console.log('server avviato su http://localhost:', PORT);
    })
    })
.catch((error) => {
    console.error('errore durante la sincronizzazione:', error);
});