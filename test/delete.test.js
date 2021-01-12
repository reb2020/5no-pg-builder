const chai = require('chai')

const Manager = require('../index')

const expect = chai.expect

describe('Builder', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  describe('Delete', () => {
    it('simple query', async() => {
      const SelectQuery = Manager.build({
        table: 'user',
        alias: 'TestUser',
        schema: 'custom',
      }).delete()
        .returning()
        .query()

      expect(SelectQuery.query).to.eql('DELETE FROM custom.user AS TestUser RETURNING TestUser.*')
    })

    it('query with where', async() => {
      const SelectQuery = Manager.build({
        table: 'user',
        alias: 'TestUser',
        schema: 'custom',
      }).delete()
        .returning()
        .where('id', '=', '123')
        .query()

      expect(SelectQuery.query).to.eql('DELETE FROM custom.user AS TestUser WHERE TestUser.id = $1 RETURNING TestUser.*')
      expect(SelectQuery.vars).to.eql([
        '123',
      ])
    })

    it('query with where and join', async() => {
      const SelectQueryInfo = Manager.build({
        table: 'users_info',
        schema: 'custom',
      }).select(['*'])

      const SelectQuery = Manager.build({
        table: 'user',
        alias: 'TestUser',
        schema: 'custom',
      }).delete()
        .join(SelectQueryInfo, 'id', 'users_id')
        .where('id', '=', '123')
        .query()

      expect(SelectQuery.query).to.eql('DELETE FROM custom.user AS TestUser USING custom.users_info AS users_info WHERE TestUser.id = $1 AND TestUser.id = users_info.users_id')
      expect(SelectQuery.vars).to.eql([
        '123',
      ])
    })

    it('query with where and couple of joins', async() => {
      const SelectQueryInfo = Manager.build({
        table: 'users_info',
        schema: 'custom',
      }).select(['*'])

      const SelectQueryRole = Manager.build({
        table: 'users_roles',
        schema: 'custom',
      }).select(['*'])

      const SelectQuery = Manager.build({
        table: 'user',
        alias: 'TestUser',
        schema: 'custom',
      }).delete()
        .join(SelectQueryInfo, 'id', 'users_id')
        .join(SelectQueryRole, 'id', 'role_id')
        .where('id', '=', '123')
        .query()

      expect(SelectQuery.query).to.eql('DELETE FROM custom.user AS TestUser USING custom.users_info AS users_info, custom.users_roles AS users_roles WHERE TestUser.id = $1 AND TestUser.id = users_info.users_id AND TestUser.id = users_roles.role_id')
      expect(SelectQuery.vars).to.eql([
        '123',
      ])
    })
  })
})
