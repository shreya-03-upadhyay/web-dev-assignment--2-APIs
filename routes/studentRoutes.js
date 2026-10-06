const express = require('express');
const router = express.Router();
let students = require('../data/students');

router.get('/', (req, res) => {
  res.status(200).json(students);
});

router.get('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).json({ message: "Student Not Found" });
  }

  res.status(200).json(student);
});

router.post('/', (req, res) => {
  const { name, course } = req.body;

  if (!name || !course) {
    return res.status(400).json({ message: "Bad Request: Name and course are required" });
  }

  const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;

  const newStudent = {
    id: newId,
    name: name,
    course: course
  };

  students.push(newStudent);
  res.status(201).json({ message: "New Student Created", student: newStudent });
});

router.put('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const { name, course } = req.body;

  const studentIndex = students.findIndex(s => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student Not Found" });
  }

  if (!name || !course) {
    return res.status(400).json({ message: "Bad Request: Name and course are required to update" });
  }

  students[studentIndex] = { id: studentId, name, course };

  res.status(200).json({
    message: "Student Updated Successfully",
    student: students[studentIndex]
  });
});

router.delete('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student Not Found" });
  }

  const deletedStudent = students.splice(studentIndex, 1);

  res.status(200).json({
    message: "Student Deleted Successfully",
    student: deletedStudent[0]
  });
});

module.exports = router;