import express, { Router } from 'express';
import { validate } from '../handlers/validation';
import { getSales } from '../controllers/sales';
const router: Router = express.Router();

router.get('/list', validate, getSales);

export default router;
