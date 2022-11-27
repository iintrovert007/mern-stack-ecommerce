const app = require('./app')
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path:'config/config.env'});

app.listen(process.env.PORT, ()=>{
    console.log(`Server listening to PORT: ${process.env.PORT} in ${process.env.NODE_ENV} `);
})