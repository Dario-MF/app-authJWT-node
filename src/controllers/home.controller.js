import { filterPage } from '../libs/filterPageWithRole';


export const homeCtrl = (req, res) => {
    const { rol }= req.user;
    const pages = filterPage(rol);
    res.render('pages/home', {title: 'Home', pages: pages});
};

export const signinCtrl = (req, res) => {
    const { rol }= req.user;
    const pages = filterPage(rol);
    res.render('pages/login/signin', {
        title: 'Entrar', 
        pages: pages,
        path: '/api/auth/signin',
        btn: 'Entrar'
    });
};

export const signupCtrl = (req, res) => {
    const { rol }= req.user;
    const pages = filterPage(rol);
    res.render('pages/login/signup', {
        title: 'Registrarse',
        pages: pages,
        path: '/api/auth/signup',
        btn: 'Registrarse'
    });
};