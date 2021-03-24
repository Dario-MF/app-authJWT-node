import jwt from "jsonwebtoken";
import config from '../config';
import User from '../models/User';


// verificar token: Existe, expirado, usuario valido, usuario activo.
export const isTokenValid = async ( req, res, next ) => {
    const token = req.headers['x-token'];
    if(!token){
        return res.status(403).json({
            msg: 'No token provaided'
        });
    };
    const {uid, exp} = jwt.verify( token, config.SECRET );
    console.log(exp, Date.now())
    if (exp > Date.now()) {
        return res.status(403).json({
            msg: 'token expired'
        });
    };
    const user = await User.findById( uid );
    if( !user ) {
        return res.status(404).json({
            msg: 'User not found'
        });
    }else if (!user.state) {
        return res.status(400).json({
            msg: 'User banned'
        });
    };
    req.user = user;
    next();
};