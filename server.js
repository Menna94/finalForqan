const path = require('path');
const express = require('express');
const app = express();

const port = 3300;

// DB
const { DBConnection } = require('./config/db');
DBConnection();
//Routes
const RecipientRoutes = require('./Routes/recipient.routes');
const DonerRoutes = require('./Routes/doner.routes');

//configs
app.use(express.json());

//cors
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader(
        'Access-Control-Allow-Methods',
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    )
    next()
})

// mount routes
app.use('/api/v1/recipients', RecipientRoutes);
app.use('/api/v1/doners', DonerRoutes);

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname+'/dist/index.html'))
})

// Start the app by listening on the default
// Heroku port
app.listen(port);

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}
// Instruct the app
// to use the forceSSL
// middleware
app.use(forceSSL());
