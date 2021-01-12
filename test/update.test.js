const chai = require('chai')

const Manager = require('../index')

const expect = chai.expect

describe('Builder', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  describe('Update', () => {
    it('simple query without where', async() => {
      const data = {
        email: 'test@test.a.a',
        first_name: 'Test',
        last_name: null,
      }

      const SelectQuery = Manager.build({
        table: 'user',
        alias: 'TestUser',
        schema: 'custom',
      }).update(data)
        .query()

      expect(SelectQuery.query).to.eql('UPDATE custom.user AS TestUser SET email = $1, first_name = $2, last_name = NULL')
      expect(SelectQuery.vars).to.eql([
        'test@test.a.a',
        'Test',
      ])
    })

    it('simple query with where', async() => {
      const data = {
        email: 'test@test.a.a',
        first_name: 'Test',
      }

      const SelectQuery = Manager.build({
        table: 'user',
        alias: 'TestUser',
        schema: 'custom',
      }).update(data)
        .where('id', '=', '123')
        .query()

      expect(SelectQuery.query).to.eql('UPDATE custom.user AS TestUser SET email = $1, first_name = $2 WHERE TestUser.id = $3')
      expect(SelectQuery.vars).to.eql([
        'test@test.a.a',
        'Test',
        '123',
      ])
    })

    it('simple query with where and returning', async() => {
      const data = {
        email: 'test@test.a.a',
        first_name: 'Test',
      }

      const SelectQuery = Manager.build({
        table: 'user',
        alias: 'TestUser',
        schema: 'custom',
      }).update(data)
        .where('id', '=', '123')
        .returning(['email'])
        .query()

      expect(SelectQuery.query).to.eql('UPDATE custom.user AS TestUser SET email = $1, first_name = $2 WHERE TestUser.id = $3 RETURNING TestUser.email')
      expect(SelectQuery.vars).to.eql([
        'test@test.a.a',
        'Test',
        '123',
      ])
    })

    it('simple query with join', async() => {
      const SelectQueryInfo = Manager.build({
        table: 'users_info',
        schema: 'custom',
      }).select(['*'])

      const data = {
        email: 'test@test.a.a',
        first_name: {
          builder: SelectQueryInfo,
          field: 'users_id',
        },
      }

      const SelectQuery = Manager.build({
        table: 'user',
        alias: 'TestUser',
        schema: 'custom',
      }).update(data)
        .innerJoin(SelectQueryInfo, 'id', 'users_id')
        .where('id', '=', '123')
        .whereIsNull('first_name')
        .returning(['email'])
        .query()

      expect(SelectQuery.query).to.eql('UPDATE custom.user AS TestUser SET email = $1, first_name = users_info.users_id FROM custom.users_info AS users_info WHERE TestUser.id = $2 AND TestUser.first_name IS NULL AND TestUser.id = users_info.users_id RETURNING TestUser.email')
      expect(SelectQuery.vars).to.eql([
        'test@test.a.a',
        '123',
      ])
    })

    it('simple query with couple of joins', async() => {
      const SelectQueryInfo = Manager.build({
        table: 'users_info',
        schema: 'custom',
      }).select(['*']).where('status', '=', 't').order('created_at', 'DESC')

      const SelectQueryRole = Manager.build({
        table: 'users_roles',
        schema: 'custom',
      }).select(['*'])
        .innerJoin(SelectQueryInfo, 'id', 'role_id')

      const data = {
        email: 'test@test.a.a',
        first_name: {
          builder: SelectQueryRole,
          field: 'role_id',
        },
      }

      const SelectQuery = Manager.build({
        table: 'user',
        alias: 'TestUser',
        schema: 'custom',
      }).update(data)
        .innerJoin(SelectQueryRole, 'id', 'users_id')
        .where('id', '=', '123')
        .whereIsNull('first_name')
        .returning(['email'])
        .query()

      expect(SelectQuery.query).to.eql('UPDATE custom.user AS TestUser SET email = $1, first_name = users_roles.role_id FROM custom.users_roles AS users_roles INNER JOIN custom.users_info AS users_info ON users_roles.id = users_info.role_id WHERE TestUser.id = $2 AND TestUser.first_name IS NULL AND TestUser.id = users_roles.users_id AND users_info.status = $3 RETURNING TestUser.email')
      expect(SelectQuery.vars).to.eql([
        'test@test.a.a',
        '123',
        't',
      ])
    })
  })
})
