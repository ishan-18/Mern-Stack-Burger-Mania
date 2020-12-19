require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true
}))

require('./models/user');
require('./models/category');
require('./models/product');

app.use('/user', require('./routes/user'));
app.use('/api', require('./routes/category'));
app.use('/api', require('./routes/clUpload'));
app.use('/api', require('./routes/product'));

const URI = process.env.MONGO_URI

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', ()=>{
    console.log('Mongodb running @27017');
})

mongoose.connection.on('error', (err)=>{
    console.log('Error', err)
})

const PORT =  process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server responding @${PORT}`)
})