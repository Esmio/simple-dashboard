import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();
import * as userController from '../controllers/user';
import { body } from 'express-validator';
import { validate } from '../handlers/validation';
import { verifyToken } from '../handlers/tokenHandler';
import User from '../models/user';

router.post(
  '/signup',
  body('username')
    .isLength({ min: 8 })
    .withMessage('username must be at least 8 charactors'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 charactors'),
  body('confirmPassword')
    .isLength({ min: 8 })
    .withMessage('confirmPassword must be at least 8 charactors'),
  body('username').custom((value: string) => {
    return User.findOne({ username: value }).then((user: any) => {
      if (user) {
        return Promise.reject('username already used');
      }
    });
  }),
  validate,
  userController.register
);

router.post(
  '/login',
  body('username')
    .isLength({ min: 8 })
    .withMessage('username must be at least 8 charactors'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 charactors'),
  validate,
  userController.login
);

router.post('/verify-token', verifyToken, (req: Request, res: Response) => {
  res.status(200).json({ code: 0, data: req.user, msg: 'success' });
});

export default router;
