const express = require('express')
const app = express()
const route = require('./src/routes')


app.use(express.json())
app.use('/',route)

app.listen(8000,()=>console.log('Server listening PORT 8000'))