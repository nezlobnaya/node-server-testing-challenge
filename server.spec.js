const request = require('supertest')
const server = require('./server')
const db = require('./data/db-config')

describe('the server', () => {

    beforeEach(async () => {
        await db('students').truncate()
    })

  it('should return status 200', () => {
      return request(server)
      .get('/')
      .then(res => {
          expect(res.type).toBe('application/json')
          expect(res.body).toEqual({  Hello: "What's up folks?" })
      })
  })
})