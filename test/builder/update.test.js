const chai = require('chai')

const Manager = require('../../compiled')

const expect = chai.expect

describe('Builder', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  describe('Update', () => {
    it('simple query without where', async () => {

        const data = {
            email: 'test@test.a.a',
            first_name: 'Test'
        }

        const SelectQuery = Manager.build({
            table: "user",
            alias: "TestUser",
            schema: "custom"
        }).update(data)
        .query()

        expect(SelectQuery.query).to.eql('UPDATE custom.user AS TestUser SET email = $1, first_name = $2')
        expect(SelectQuery.vars).to.eql([
            "test@test.a.a",
            "Test"
            ])
    })
    
    it('simple query with where', async () => {

        const data = {
            email: 'test@test.a.a',
            first_name: 'Test'
        }

        const SelectQuery = Manager.build({
            table: "user",
            alias: "TestUser",
            schema: "custom"
        }).update(data)
        .where("id", "=", "123")
        .query()

        expect(SelectQuery.query).to.eql('UPDATE custom.user AS TestUser SET email = $1, first_name = $2 WHERE TestUser.id = $3')
        expect(SelectQuery.vars).to.eql([
            "test@test.a.a",
            "Test",
            "123"
            ])
    })
    
    it('simple query with where and returning', async () => {

        const data = {
            email: 'test@test.a.a',
            first_name: 'Test'
        }

        const SelectQuery = Manager.build({
            table: "user",
            alias: "TestUser",
            schema: "custom"
        }).update(data)
        .where("id", "=", "123")
        .returning(['email'])
        .query()

        expect(SelectQuery.query).to.eql('UPDATE custom.user AS TestUser SET email = $1, first_name = $2 WHERE TestUser.id = $3 RETURNING TestUser.email')
        expect(SelectQuery.vars).to.eql([
            "test@test.a.a",
            "Test",
            "123"
            ])
    })
  })
})
