const express = require ('express');
const dotenv = require ('dotenv');
const cors = require ('cors');
const connectDB = require ('./config/db.js');
// const {errorHandler} = require ('./middleware/errorMiddleware');
// const userRoutes = require ('./routes/userRoutes');
const e = require('express');

dotenv.config();
connectDB();


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('API is running...');
});

// app.use(errorHandler);  

const PORT = process.env.PORT || 5000;  

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));


