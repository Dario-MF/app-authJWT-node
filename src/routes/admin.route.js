import { Router } from 'express';


const router = Router();

router.get('/users', (req, res)=> {
    res.json({
        msg: 'ruta client OK'
    })
});

router.get('/new', (req, res)=> {
    res.json({
        msg: 'ruta new user OK'
    })
});

export default router