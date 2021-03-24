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