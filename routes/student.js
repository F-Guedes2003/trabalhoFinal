import express from 'express';
import { createStudent, getAllStudents, getStudentById, getAverage } from '../controllers/student.js';
import { authenticateJwt } from '../middlewares.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: "hello world!"
    });
})

router.post('/alunos', authenticateJwt, createStudent);

router.get('/alunos', authenticateJwt, getAllStudents);

router.get('/alunos/medias', authenticateJwt, getAverage);

router.get('/alunos/:id', authenticateJwt, getStudentById);


export default router;