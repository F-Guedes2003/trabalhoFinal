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

const getAllStudents = async (req, res) => {
    const students = await Student.find();
    return res.status(200).json(students);
}

const getStudentById = async (req, res) => {
    const urlId = req.params.id;
    const student = await Student.find({_id: urlId})

    if(student) return res.status(200).json(student);

    return res.status(400).json({message: "Student not found"});
}

const getAverage = async (req, res) => {
    const students = await Student.find();
    const transformedStudents = students.map(item => {
        const average = ( item["nota1"] + item["nota2"] ) / 2; 

        return {name: item.name, average};
    });
    
    return res.status(200).json(transformedStudents);
}

const getStatus = async (req, res) => {
    const students = await Student.find();
    const transformedStudents = students.map(item => {
        const average = ( item["nota1"] + item["nota2"] ) / 2; 

        if(average >= 6) return {name: item.name, status: "Aprovado"};

        return {name: item.name, status: "Reprovado"};
    });
    
    return res.status(200).json(transformedStudents);
}

const updateStudent = async (req, res) => {
    const id = req.params.id;
    const bluePrint = req.body;
    if(!id) return res.status(400).json("Id required");

    const updatedStudent = await Student.findOneAndUpdate({"_id": id}, bluePrint, {new: true, runValidators: true});
    
    if(!updatedStudent) return res.status(400).json({message: "Failed to update student"});

    return res.status(200).json({message: "Student updated with success"});
}

export { createStudent, getAllStudents, getStudentById, getAverage, getStatus, updateStudent  };