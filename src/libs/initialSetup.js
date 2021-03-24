import Role from '../models/Role';

// Inicialización de los roles si no existen en DB.
export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();
        if(count > 0){
            return;
        }
        const roles = await Promise.all([
            new Role({ name: 'ADMIN_ROLE'}).save(),
            new Role({ name: 'VENTAS_ROLE'}).save(),
            new Role({ name: 'USER_ROLE'}).save()
        ]); 
        console.log('Initial roles created:', roles);
    } catch (error) {
        console.log('Error:', error);
    }; 
};