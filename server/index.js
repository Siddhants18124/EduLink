require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./db');
const userRoutes = require('./routes/userRoutes');


const app = express();

connection();

//middlewars
app.use(express.json());
app.use(cors({
    origin: true,
    credentials:true
}))


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/user', userRoutes);


//routes

const port = process.env.PORT || 8000;
app.listen(port, () => {console.log(`Server is running on port ${port}`)});