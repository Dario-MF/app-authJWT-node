import express from 'express';
import morgan from 'morgan';
import path from 'path'

import config from './config'
import { createRoles } from './libs/initialSetup';

import homeRoute from './routes/home.route';
import userRoute from './routes/user.route';
import adminRoute from './routes/admin.route';
import authRoute from './routes/auth.route';


const app = express();
createRoles();

// Settings
app.set('port', config.PORT || 3000);
app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname + '/views'));

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('src/public'));

// Routes page
app.use('/', homeRoute);
app.use('/user', userRoute);
app.use('/admin', adminRoute);


// Routes api
app.use('/api/auth', authRoute);

// Catch error path
app.use('*', (req, res, next)=> {
    res.status(404).json( {
        msg: 'Not found'
    })
})


export default app;