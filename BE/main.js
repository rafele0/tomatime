const sequelize = require('./db.js')
const Task = require('./entities/tasks.js')
const functions = require('./taskController.js')



async function main(task){
    try{
        await sequelize.sync({force : true})
        console.log('il database è stat sincronizzato')
        

        const newTask = await Task.create(task)
        console.log('Nuovo autore creato!', newTask.toJSON())
    }catch(error) {
        console.error("errore nell'esecuzione ", error)
    }finally{
        await sequelize.close() // chiude il db a prescindere che abbia funzionato o no
    }
}
main()

module.exports=main