const Students = require('./studentsModel')

const db = require('../data/db-config')

describe('the Students model', () => {

    beforeEach(async () => {
        await db('students').truncate()
    })

    describe('the addStudent function', () => {
        it('should add an entry to the db', async () => {
            const studentData = { name: 'Vlad' }
            const student = await Students.addStudent(studentData)
            const students = await db('students')
            expect(students.length).toBe(1)
            expect(students[0].name).toBe('Vlad')
        })
        it('should resolve to the newly created student', async () => {
            const studentData = { name: "Vlad"}
            const student = await Students.addStudent(studentData)
            expect(student).toEqual({id: 1, name: "Vlad" })
        })
    })

    describe('the removeStudent function', () => {
        xit('should remove an entry to the db', async () => {

        })
    })
})