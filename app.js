
const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes/albums')

const loginRouter = require('./routes/login')
const userRouter = require('./routes/users')
app.use(express.json())
app.use('/register', userRouter)
app.use('/login', loginRouter)
app.use('/albums', router)

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})