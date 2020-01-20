const db = require('../data/db-config')

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent,

}

    function getStudents() {
        return db('students')
    }

    function getStudentById(id) {
        return db('students').where({ id }).first()
    }

    function removeStudent(id) {
        return db('students').where({ id }).del()
    }


    async function addStudent(student) {
        return db('students').insert(student)
        .then( ids => {
            return getStudentById(ids[0])
        })
    }

  
    async function updateStudent(changes, id) {
        return db('students').where({ id }).update(changes)
        .then(count => {
            return getStudentById(id)
        })
    }
