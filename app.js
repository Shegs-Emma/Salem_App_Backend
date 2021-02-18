const express           = require('express'),
    app                 = express(),
    bodyParser          = require('body-parser'),
    cors                = require('cors'),
    mongoose            = require('mongoose'),
    dotenv              = require('dotenv');

dotenv.config();

const userRoutes        = require('./routes/user');


const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:8080'];
const corsOptions = {
    origin: function (origin, callback) {
        // console.log("** Origin of request " + origin);
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            // console.log("Origin accepted")
            callback(null, true)
        } else {
            callback(new Error('Not allowed by cors'))
        }
    }
}

app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


let url = `mongodb+srv://stayclean_professionals:${process.env.MONGO_PASS}@salemlaundryapp.polvm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.log('Something went wrong');
        console.error(error);
    });
    
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



// ===================================== My Routes ===============================================
app.use('/api/auth', userRoutes);



module.exports = app;