import dotenv from 'dotenv';

dotenv.config()

export default {
    SECRET: process.env.SECRET,
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT,
};