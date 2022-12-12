const app = require('./app')
const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./config/database');



dotenv.config({path:path.join(__dirname,'config/config.env')});

connectDatabase();



const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server listening to PORT: ${process.env.PORT} in ${process.env.NODE_ENV} `);
})
process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaughtException exception`)
    server.close(()=>{
        process.exit();
    })
})
console.log(a);
process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandledRejection exception`)
    server.close(()=>{
        process.exit();
    })
})

