import express from 'express';
import { registerUser, login, refreshToken } from "../controllers/user.js"

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', login);

router.get('/refresh', refreshToken);

export default router;