

export const filterPage = (rol = '') => {
    switch (rol) {
        case 'USER_ROLE':     
           return [
                {name: 'Home', link: '/'},
                {name: 'User', link: '/user'},
                {name: 'Salir', link: '/'}
            ];
        case 'MODERADOR_ROLE':
            return [
                 {name: 'Home', link: '/'},
                 {name: 'User', link: '/user'},
                 {name: 'Users List', link: '/admin/users'},
                 {name: 'Salir', link: '/'}  
            ];    
        case 'ADMIN_ROLE':
            return [
                 {name: 'Home', link: '/'},
                 {name: 'User', link: '/user'},
                 {name: 'Users List', link: '/admin/users'},
                 {name: 'Nuevo Usuario',link: '/admin/new'},
                 {name: 'Salir', link: '/'}
            ];
        default:
            return [
                 {name: 'Home', link: '/'},
                 {name: 'Entrar', link: '/signin'},
                 {name: 'Registrarse', link: '/signup'}
            ];
    };
};