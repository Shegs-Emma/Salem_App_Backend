const http          = require('http'),
    express         = require('express'),
    app             = require('./app'),
    path            = require('path');


require('dotenv').config();

// Check if we are in development or production mode
if (process.env.NODE_ENV === 'production') {
    //Serve any static files
    app.use(express.static(path.join(__dirname, 'build')));


    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'))
    })
}


app.set('port', process.env.PORT || 3001);

const server = http.createServer(app);

server.listen(process.env.PORT || 3001);