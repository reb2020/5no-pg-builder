const chai = require('chai')

const Manager = require('../../lib')

const expect = chai.expect

describe('Builder', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  describe('Insert', () => {
    it('simple query', async() => {
      const data = {
        id: '123',
        email: 'test@test.a.a',
        first_name: 'Test',
        last_name: null,
        personalised: {
          test: 100,
        },
      }

      const SelectQuery = Manager.build({
        table: 'user',
        schema: 'custom',
      }).insert(data)
        .returning()
        .query()

      expect(SelectQuery.query).to.eql('INSERT INTO custom.user AS user (id, email, first_name, last_name, personalised) VALUES ($1, $2, $3, NULL, $4) RETURNING user.*')
      expect(SelectQuery.vars).to.eql([
        '123',
        'test@test.a.a',
        'Test',
        '{"test":100}',
      ])
    })

    it('simple query on conflict do nothing', async() => {
      const data = {
        id: '123',
        email: 'test@test.a.a',
        first_name: 'Test',
        last_name: null,
        personalised: {
          test: 100,
        },
      }

      const SelectQuery = Manager.build({
        table: 'user',
        alias: 'TestUser',
        schema: 'custom',
      }).insert(data)
        .onConflict(['email'])
        .doNothing()
        .returning()
        .query()

      expect(SelectQuery.query).to.eql('INSERT INTO custom.user AS TestUser (id, email, first_name, last_name, personalised) VALUES ($1, $2, $3, NULL, $4) ON CONFLICT (email) DO NOTHING RETURNING TestUser.*')
      expect(SelectQuery.vars).to.eql([
        '123',
        'test@test.a.a',
        'Test',
        '{"test":100}',
      ])
    })

    it('simple query on conflict do update set', async() => {
      const data = {
        id: '123',
        email: 'test@test.a.a',
        first_name: 'Test',
        last_name: null,
        personalised: {
          test: 100,
        },
      }

      const SelectQuery = Manager.build({
        table: 'user',
        alias: 'TestUser',
        schema: 'custom',
      }).insert(data)
        .onConflict(['id', 'email'])
        .doUpdate(['email', 'first_name', 'last_name'])
        .returning(['email'])
        .query()

      expect(SelectQuery.query).to.eql('INSERT INTO custom.user AS TestUser (id, email, first_name, last_name, personalised) VALUES ($1, $2, $3, NULL, $4) ON CONFLICT (id, email) DO UPDATE SET email = $2, first_name = $3, last_name = NULL WHERE TestUser.id = $1 AND TestUser.email = $2 RETURNING TestUser.email')
      expect(SelectQuery.vars).to.eql([
        '123',
        'test@test.a.a',
        'Test',
        '{"test":100}',
      ])
    })
  })
})
