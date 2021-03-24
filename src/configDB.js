import mongoose from 'mongoose';
import config from './config'


( async() => {
    try {
        const db = await mongoose.connect(config.MONGO_URL, {
            useNewUrlParser: true,
            useCreateIndex : true , 
            useUnifiedTopology: true,
            useFindAndModify: true
        })
        console.log('DB connected to:', db.connection.name );
    } catch (error) {
        console.log('Error en DB:', error);
    }  
} )();

