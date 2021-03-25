import { Router } from 'express';
import { homeCtrl, signinCtrl, signupCtrl } from '../controllers/home.controller';
import { hasToken } from '../middlewares/authJwt';


const router = Router();

router.get('/', [
    hasToken
], homeCtrl);

router.get('/signin', [
    hasToken
], signinCtrl);

router.get('/signup', [
    hasToken
], signupCtrl);

export default router