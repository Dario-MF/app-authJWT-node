import { Router } from 'express';
import { isTokenValid } from '../middlewares/authJwt'
import { isAdminRole } from '../middlewares/validRole';

const router = Router();

router.get('/',[ isTokenValid, isAdminRole ], (req, res)=> {
    res.json({
        msg: 'ruta al home OK'
    })
});

export default router