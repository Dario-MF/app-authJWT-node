import Role from '../models/Role';



// Filtro de rol Administrador.
export const isAdminRole = async( req, res, next ) => {
    if ( !req.user ) {
        return res.status(500).json({
            msg: 'problem in server, need validate role after token'
        });
    };
    const roles = await Role.find({ _id: { $in: req.user.roles } });
    roles.map(rol => {
        if(rol.name === 'ADMIN_ROLE'){
             next();
        };
    });
    return res.status(403).json({
        msg: 'Forbidden, access denied: role valid required.'
    }); 
};

// Filtro rol ventas.
export const isVentasRole = async( req, res, next ) => {
    if ( !req.user ) {
        return res.status(500).json({
            msg: 'problem in server, need validate role after token'
        });
    };
    const roles = await Role.find({ _id: { $in: req.user.roles } });
    roles.map(rol => {
        if(rol.name === 'VENTAS_ROLE' || rol.name === 'ADMIN_ROLE'){
             next();
        };
    });
    return res.status(403).json({
        msg: 'Forbidden, access denied: role valid required.'
    });
};

// Filtro, si no hay rol se usa user predefinido, si hay se comprueban.
export const isValidRole = async (req, res, next ) => {

    if( !req.body.roles || !req.body.roles.length ){
        const role = await Role.findOne({ name: 'USER_ROLE' });
        req.body.idRoles = [role._id];

    }else{
        const roles = await Role.find({ name: { $in: req.body.roles } });
        if(!roles.length){
            return res.status(400).json({
                msg: 'Invalid role'
            });
        };
        req.body.idRoles = roles.map(rol => rol._id); 
    };
    next();
};