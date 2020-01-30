const Students = require('./studentsModel')
const request = require('supertest')

const server =require('../server')
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
        it('should remove an entry from the db', async () => {
            await Students.addStudent({ name: 'Vlad'})
            await Students.removeStudent(1)
            const students = await db('students')
            expect (students).toHaveLength(0)
        })
    })

    it('it should fetch a single student', async () => {
        await Students.addStudent({ name: 'Vlad'})
        await Students.addStudent({ name: 'Vasya'})
        const id = 2
        const res = await request(server).get(`/api/students/${id}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
    })

    it('should return list of students', () => {
        return request(server).get('/api/students')
        .then(res => {
            expect(res.status).toBe(200)
            expect(res.type).toBe('application/json')
            expect(res.body).toEqual([])
        })
    })

    it('should update a student', async () => {
        await Students.addStudent({ name: 'Vlad'})
        const res = await request(server)
          .put('/api/students/1')
          .send({
            name: 'updated title',
          });
        expect(res.statusCode).toEqual(200);
        expect({ name: 'updated title' });
      });

})