const chai = require('chai')

const Manager = require('../../compiled')

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
        alias: 'TestUser',
        schema: 'custom',
      }).insert(data)
        .returning()
        .query()

      expect(SelectQuery.query).to.eql('INSERT INTO custom.user (id, email, first_name, last_name, personalised) VALUES ($1, $2, $3, NULL, $4) RETURNING *')
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

      expect(SelectQuery.query).to.eql('INSERT INTO custom.user (id, email, first_name, last_name, personalised) VALUES ($1, $2, $3, NULL, $4) ON CONFLICT (email) DO NOTHING RETURNING *')
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
        .returning()
        .query()

      expect(SelectQuery.query).to.eql('INSERT INTO custom.user (id, email, first_name, last_name, personalised) VALUES ($1, $2, $3, NULL, $4) ON CONFLICT (id, email) DO UPDATE SET email = $2 first_name = $3 last_name = NULL WHERE id = $1 AND email = $2 RETURNING *')
      expect(SelectQuery.vars).to.eql([
        '123',
        'test@test.a.a',
        'Test',
        '{"test":100}',
      ])
    })
  })
})
