//================== importing libraries================================================
// in-built libraries
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
// third parties (npm) libraries
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session')(session);
const databaseServerURL = 'mongodb://localhost:27017/rent-a-girlfriend';
const store = new mongodbStore({ 
        url : 'mongodb://localhost:27017/rent-a-girlfriend/sessions/',
        collection : 'sessions',
});
//custom routes
const products_route = require('./routes/products');
const registration_route = require('../rent-a-girlfriend/routes/registration');
const new_registration_route = require('./models/new-registration');
const displaySingleProductRoute = require('./routes/displaySingleProduct');
const loginRoute = require('./routes/login');
const updateRoute = require('./models/update');
const loginAuthorizationRoute = require('./models/loginAuthorization');
const userRegistraionRoute = require('./routes/userRegistrationRoute');
const userRegistration = require('./models/userRegistration');
const userAuthentication = require('./routes/userAuthentication');
const userLogin = require('./routes/userLogin');
const rentalBooking = require('./controllers/rentalBooking');
const endSession = require('./controllers/endSession');
const cartRouter = require('./controllers/cart'); 
const cartFunctionRoute = require('./util/cartFunctions');
//==================================================================
//================== essential functions ================================================
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
        secret:"secret encoding key",
        resave : false,
        saveUninitialized : false,
        store : store,
        
}));
app.set('views','views');
app.set('view engine','ejs');
//================= main logic / program =================================================


app.use('/homepage',(req,res)=>{
        authToken = req.session.isLoggedIn;
        res.render('homepage',{authToken : authToken});
});
app.use(products_route);
app.use(registration_route);
app.use(new_registration_route);
app.use(displaySingleProductRoute);
app.use(loginRoute);
app.use(updateRoute);
app.use(loginAuthorizationRoute);
app.use(userRegistration);
app.use(userRegistraionRoute);
app.use(userAuthentication);
app.use(userLogin);
app.use(rentalBooking);
app.use(endSession);
app.use(cartRouter);
app.use(cartFunctionRoute);
//================ launching the server ==================================================
app.use('/',(req,res)=>{
        res.render('error_page');
});
mongoose.connect(databaseServerURL)
        .then(()=>{
                console.log('database connected');
                app.listen(3000);
        })
        .catch((err) =>{
                console.log(err);
        });
