import express from 'express';
import { createStudent } from '../controllers/student.js';
import { authenticateJwt } from '../middlewares.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: "hello world!"
    });
})

router.post('/alunos', authenticateJwt, createStudent);


export default router;