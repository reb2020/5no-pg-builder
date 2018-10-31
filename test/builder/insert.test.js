const chai = require('chai')

const Manager = require('../../compiled')

const expect = chai.expect

describe('Builder', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  describe('Insert', () => {
    it('simple query', async () => {

        const data = {
            id: '123',
            email: 'test@test.a.a',
            first_name: 'Test'
        }

        const SelectQuery = Manager.build({
            table: "user",
            alias: "TestUser",
            schema: "custom"
        }).insert(data)
        .returning()
        .query()

        expect(SelectQuery.query).to.eql('INSERT INTO custom.user (id, email, first_name) VALUES ($1, $2, $3) RETURNING *')
        expect(SelectQuery.vars).to.eql([
            "123",
            "test@test.a.a",
            "Test"
            ])
    })
  })
})
