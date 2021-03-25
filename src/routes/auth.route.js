import { Router } from 'express';
import { check } from 'express-validator';
import { isEmailUnique, validateParams } from '../middlewares/customValidators';
import { isValidRole } from '../middlewares/validRole';
import * as authCtrl from '../controllers/auth.controller';

const router = Router();

router.post('/signup', [
    check('name', 'name is required').notEmpty(),
    check('surname', 'surname is required').notEmpty(),
    check('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('email is invalid')
        .custom( isEmailUnique ), 
    check('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({ min: 6 })
        .withMessage('password must contain at least 6 characters')
        .isLength({ max: 20 })
        .withMessage("password can contain max 20 characters")
        .matches(/\d/)
        .withMessage('password must contain a number'),
    isValidRole,
    validateParams
], authCtrl.signUp);


router.post('/signin', [
    check('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('email is invalid'),
    check('password')
        .notEmpty()
        .withMessage('password is required'),
    validateParams
], authCtrl.signIn);


export default router;