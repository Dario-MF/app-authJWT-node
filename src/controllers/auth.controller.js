import jwt from 'jsonwebtoken';

import User from '../models/User';
import Role from '../models/Role';
import config from '../config';



export const signUp = async (req, res)=> {
    const {name, surname, email, password, roles} = req.body;
    const newUser = new User({
        name,
        surname,
        email,
        password: await User.ecryptPassword(password)
    });
    if( roles ){
        const foundRoles = await Role.find({ name: {$in: roles}});
        newUser.roles = foundRoles.map(rol => rol._id);
    }else{
        const role = await Role.findOne({ name: 'USER_ROLE' });
        newUser.roles = [ role._id ];
    }; 
    const savedUser = await newUser.save();
    const token = jwt.sign({uid: savedUser._id}, config.SECRET, {
        expiresIn: 86400 //24horas
    });
    res.status(200).json({
        msg: 'Signup correct',
        token
    });
};


export const signIn = async (req, res)=> {
    const { email, password } = req.body;
    // Validar email
    const user = await User.findOne({ email });
    if (!user){
        return res.status(400).json({
            msg: 'email or password incorrect'
        });
    }
    if ( !user.state ){
        return res.status(400).json({
            msg: 'email or password incorrect'
        });
    }
    // validar password.
    const validPassword = await User.comparePassword(password, user.password);
    if ( !validPassword ){
        return res.status(400).json({
            msg: 'email or password incorrect'
        });
    };
    // Grabar token
    const token = jwt.sign({uid: user._id}, config.SECRET, {
        expiresIn: 86400 //24horas
    });

    res.status(200).json({
        msg: 'Signin correct',
        token
    });
};