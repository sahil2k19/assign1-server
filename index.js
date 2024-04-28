const express  = require('express')


const app = express()




app.get('/', (req, res) => {
    res.send('Hello World!')
})  

app.listen(2100, () => {
    console.log('Server started on port 2100')
})