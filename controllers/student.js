import { authenticateJwt } from "../middlewares.js";
import Student from "../models/student.js";

const createStudent = (req, res) => {
    const name = req.body.name;
    const ra = req.body.ra;
    const nota1 = req.body.nota1;
    const nota2 = req.body.nota2;

    if(!name || !ra) return res.status(400).json({message: "ra and name fields are required!"});

    const db = new Student( {name, ra, nota1, nota2} );
    db.save();

    res.status(201).json({ message: "Student created with success" });
}

export { createStudent };