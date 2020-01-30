const express = require('express')

const Students = require('./studentsModel')

const router = express.Router()

router.get('/', (req, res, next) => {
    Students.getStudents()
    .then(students => {
        res.json(students)
    })
    .catch(err => {
        next(err)
    })
})

router.get('/:id', (req, res, next) => {
    const { id } =req.params

    Students.getStudentById(id)
    .then(student => {
        if(student) {
            res.json(student)
        } else {
            res.status(404).json({ message: 'Could not find student with given id' })
        }
    })
    .catch(err => {
        console.log(err)
        next(err)
    })
})

router.post('/', (req, res) => {
    const studentData = req.body;
  
    Students.addStudent(studentData)
    .then(student => {
      res.status(201).json(student);
    })
    .catch (err => {
        console.log(err)
      res.status(500).json({ message: 'Failed to create new student' });
    });
  });


 
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    Students.removeStudent(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find student with given id' });
      }
    })
    .catch(err => {
        console.log(err)
      res.status(500).json({ message: 'Failed to delete student' });
    });
  });

  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    Students.getStudentById(id)
    .then(student => {
      if (student) {
       Students.updateStudent(changes, id)
        .then(updatedStudent => {
          res.json(updatedStudent);
        });
      } else {
        res.status(404).json({ message: 'Could not find student with given id' });
      }
    })
    .catch (err => {
        console.log(err)
      res.status(500).json({ message: 'Failed to update student' });
    });
  });
  


module.exports = router