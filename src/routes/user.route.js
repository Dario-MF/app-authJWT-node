import { Router } from 'express';


const router = Router();

router.get('/', (req, res)=> {
    res.render('pages/user/user', {title: 'User'})
});

export default router