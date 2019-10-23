const chai = require('chai')

const Manager = require('../../compiled')

const expect = chai.expect

describe('Builder', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  describe('Count', () => {
    it('without where and distinct', async() => {
      const SelectQuery = Manager.build({
        table: 'user',
        alias: 'TestUser',
        schema: 'custom',
      }).count('email')
        .query()

      expect(SelectQuery.query).to.eql('SELECT COUNT(TestUser.email) AS count_rows FROM custom.user AS TestUser')
    })

    it('with distinct', async() => {
      const SelectQuery = Manager.build({
        table: 'user',
        alias: 'TestUser',
        schema: 'custom',
      }).count('email')
        .distinct()
        .query()

      expect(SelectQuery.query).to.eql('SELECT COUNT(DISTINCT TestUser.email) AS count_rows FROM custom.user AS TestUser')
    })

    it('with where and distinct', async() => {
      const SelectQuery = Manager.build({
        table: 'user',
        alias: 'TestUser',
        schema: 'custom',
      }).count('email')
        .distinct()
        .where('first_name', '=', 'first_name_test')
        .whereIn('last_name', ['last_name1', 'last_name2'])
        .whereOr('email', '=', 'test')
        .whereOr('email', '=', 'test1')
        .query()

      expect(SelectQuery.query).to.eql('SELECT COUNT(DISTINCT TestUser.email) AS count_rows FROM custom.user AS TestUser WHERE TestUser.first_name = $1 AND TestUser.last_name IN ($2,$3) AND (TestUser.email = $4 OR TestUser.email = $5)')
      expect(SelectQuery.vars).to.eql([
        'first_name_test',
        'last_name1',
        'last_name2',
        'test',
        'test1',
      ])
    })

    it('with inner join with where', async() => {
      const SelectQueryInfo = Manager.build({
        table: 'user_info',
        schema: 'custom',
      }).count('*').where('status', '=', 't')

      const SelectQuery = Manager.build({
        table: 'user',
        alias: 'TestUser',
        schema: 'custom',
      }).count()
        .innerJoin(SelectQueryInfo, 'id', 'user_id')
        .where('first_name', '=', 'first_name_test')
        .query()

      expect(SelectQuery.query).to.eql('SELECT COUNT(user_info.*) AS count_rows FROM custom.user AS TestUser INNER JOIN custom.user_info AS user_info ON TestUser.id = user_info.user_id WHERE TestUser.first_name = $1 AND user_info.status = $2')
      expect(SelectQuery.vars).to.eql([
        'first_name_test',
        't',
      ])
    })

    it('with inner join with where and distinct', async() => {
      const SelectQueryInfo = Manager.build({
        table: 'user_info',
        schema: 'custom',
      }).count('*').where('status', '=', 't')

      const SelectQuery = Manager.build({
        table: 'user',
        alias: 'TestUser',
        schema: 'custom',
      }).count()
        .distinct()
        .innerJoin(SelectQueryInfo, 'id', 'user_id')
        .where('first_name', '=', 'first_name_test')
        .query()

      expect(SelectQuery.query).to.eql('SELECT COUNT(DISTINCT user_info.*) AS count_rows FROM custom.user AS TestUser INNER JOIN custom.user_info AS user_info ON TestUser.id = user_info.user_id WHERE TestUser.first_name = $1 AND user_info.status = $2')
      expect(SelectQuery.vars).to.eql([
        'first_name_test',
        't',
      ])
    })
  })
})
