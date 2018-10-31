const chai = require('chai')

const Manager = require('../../compiled')

const expect = chai.expect

describe('Builder', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  describe('Delete', () => {
    it('simple query', async () => {

        const SelectQuery = Manager.build({
            table: "user",
            alias: "TestUser",
            schema: "custom"
        }).delete()
        .returning()
        .query()

        expect(SelectQuery.query).to.eql('DELETE FROM custom.user AS TestUser RETURNING TestUser.*')
    })

    it('query with where', async () => {

        const SelectQuery = Manager.build({
            table: "user",
            alias: "TestUser",
            schema: "custom"
        }).delete()
        .returning()
        .where("id", "=", "123")
        .query()

        expect(SelectQuery.query).to.eql('DELETE FROM custom.user AS TestUser WHERE TestUser.id = $1 RETURNING TestUser.*')
        expect(SelectQuery.vars).to.eql([
            "123"
            ])
    })
  })
})
