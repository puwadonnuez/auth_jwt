const express     = require('express')
const profileRoute = require('./router/profile')

const app   = express();
const port  =  process.env.PORT || 4000;
app.use(express.json())

app.use(profileRoute)
app.listen(port,() =>{
    console.log('server is up on ' + port);
})  