import User from '../models/User';
import { validationResult } from 'express-validator'



// validar si el email esta en uso.
export const isEmailUnique = async (email = '') => {
    const emailExist = await User.findOne({ email });
    if(emailExist){
        throw new Error(`email: ${email}, already in use`);
    };
};

// validar si el id existe en la DB.
export const userIdExist = async( id = '' ) => {
    const userExist = await User.findById( id );
    if (!userExist) {
        throw new Error(`user with id: ${id}, not exist`);
    };
};

// retornar errores
export const validateParams = (req, res, next)=> {
    const errorFormatter = ({ msg }) => {
        return `msg: ${msg}`;
    };
    const result = validationResult(req).formatWith(errorFormatter);
    if(!result.isEmpty()){
        return res.status(400).json({
             errors: result.array()
        });
    };
    next();
};