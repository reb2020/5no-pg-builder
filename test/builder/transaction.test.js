const chai = require('chai')

const Manager = require('../../lib')

const expect = chai.expect

describe('Builder', () => {
  beforeEach(() => {
    Manager.query = (q) => {
      return new Promise((resolve) => {
        resolve(q)
      })
    }
  })

  afterEach(() => {
  })

  describe('Transaction', () => {
    it('begin and commit', async() => {
      const begin = await Manager.begin()

      const data = {
        id: '123',
        email: 'test@test.a.a',
        first_name: 'Test',
      }

      const SelectQuery = await Manager.build({
        table: 'user',
        schema: 'custom',
      }).insert(data)
        .returning()
        .execute()

      const commit = await Manager.commit()

      expect(begin).to.eql('BEGIN')
      expect(SelectQuery).to.eql('INSERT INTO custom.user AS user (id, email, first_name) VALUES ($1, $2, $3) RETURNING user.*')
      expect(commit).to.eql('COMMIT')
    })

    it('begin and rollback', async() => {
      const begin = await Manager.begin()

      const data = {
        id: '123',
        email: 'test@test.a.a',
        first_name: 'Test',
      }

      const SelectQuery = await Manager.build({
        table: 'user',
        schema: 'custom',
      }).insert(data)
        .returning()
        .execute()

      const rollback = await Manager.rollback()

      expect(begin).to.eql('BEGIN')
      expect(SelectQuery).to.eql('INSERT INTO custom.user AS user (id, email, first_name) VALUES ($1, $2, $3) RETURNING user.*')
      expect(rollback).to.eql('ROLLBACK')
    })
  })
})
