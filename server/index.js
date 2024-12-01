require('dotenv').config();
const express = require('express');
const connectionDB = require('./db');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

connectionDB();

//middlewars
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api', userRoutes);


//routes
const port = process.env.PORT || 8000;
app.listen(port, () => {console.log(`Server is running on port ${port}`)});