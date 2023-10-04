require ('express-async-errors')
const AppError = require('./utils/AppError')
const express = require('express')
const routes = require('./routes')
const cors = require('cors');
const database = require('./database/sqlite')

const app = express()
const PORT = 3333

app.use(express.json())
app.use(cors())
app.use(routes)
database()


//para tratamento de erros
app.use((error, req , res, next)=>{
    if (error instanceof AppError){
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }
    console.log(error)

    return res.status(500).json({
        status: "error",
        message: "Internal server Error!"
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
})

