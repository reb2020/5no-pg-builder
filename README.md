
Simple query builder for PostgreSQL

## Install

5no-pg-builder requires Node version 8 or above.

```sh
npm install --save 5no-pg-builder
```

## Examples

SELECT

```js
const Manager = require('5no-pg-builder')()

const Users = Manager.build({
    table: "users"
  }).select(["*"]).execute()
// "SELECT users.* FROM public.users AS users"    

const Users = Manager.build({
    table: "users",
    alias: "Testusers"
  }).select(["*"]).execute()
// "SELECT Testusers.* FROM public.users AS Testusers"    

const Users = Manager.build({
    table: "users",
    alias: "Testusers",
    schema: "custom"
  }).select(["*"])
  .execute()
// "SELECT Testusers.* FROM custom.users AS Testusers"    

const Users = Manager.build({
    table: "users",
    alias: "Testusers",
    schema: "custom"
  }).select(["sum(email) AS sum_emails"])
  .execute()
// "SELECT sum(Testusers.email) AS sum_emails FROM custom.users AS Testusers"    

const Users = Manager.build({
    table: "users",
    alias: "Testusers",
    schema: "custom"
  }).select(["email", "first_name", "last_name AS FN"])
    .where('status', '=', 'active')
    .whereIn('id', ['1', '2', '3'])
    .whereOr('email', '=', 'test')
    .whereOr('email', '=', 'test1')
    .execute()
// "SELECT Testusers.email, Testusers.first_name, Testusers.last_name AS FN FROM custom.users AS Testusers WHERE Testusers.status = $1 AND Testusers.id IN ($2,$3,$4) AND (Testusers.email = $5 OR Testusers.email = $6)"    

const Users = Manager.build({
    table: "users",
    alias: "Testusers",
    schema: "custom"
  }).select(["email", "first_name", "last_name AS FN"])
    .whereOr('email', '=', 'test', 'email')
    .whereOr('email', '=', 'test1', 'email')
    .whereOr('last_name', '=', 'last_name1', 'last_name')
    .whereOr('last_name', '=', 'last_name2', 'last_name')
    .execute()
// "SELECT Testusers.email, Testusers.first_name, Testusers.last_name AS FN FROM custom.users AS Testusers WHERE (Testusers.email = $1 OR Testusers.email = $2) AND (Testusers.last_name = $3 OR Testusers.last_name = $4)"    

const Users = Manager.build({
    table: "users",
    alias: "Testusers",
    schema: "custom"
  }).select(["email", "first_name", "last_name AS FN"])
    .distinct()
    .where('first_name', '=', 'first_name_test')
    .order('email', 'ASC')
    .order('first_name', 'DESC')
    .limit(10, 5)
    .execute()
// "SELECT DISTINCT Testusers.email, Testusers.first_name, Testusers.last_name AS FN FROM custom.users AS Testusers WHERE Testusers.first_name = $1 ORDER BY Testusers.email ASC, Testusers.first_name DESC LIMIT 10 OFFSET 5"    

const Users = Manager.build({
    table: "users",
    alias: "Testusers",
    schema: "custom"
  }).select(["email"])
    .where('first_name', '=', 'first_name_test')
    .group(['email'])
    .order('email', 'ASC')
    .having('count(email)', '>', '1')
    .execute()
// "SELECT Testusers.email FROM custom.users AS Testusers WHERE Testusers.first_name = $1 GROUP BY Testusers.email HAVING count(Testusers.email) > $2 ORDER BY Testusers.email ASC"   

const Users = Manager.build({
    table: "users",
    alias: "Testusers",
    schema: "custom"
  }).count("email")
    .distinct()
    .execute()
//SELECT COUNT(DISTINCT TestUser.email) AS count_rows FROM custom.users AS TestUser        
```


SELECT WITH JOIN

```js

const SelectQueryInfo = Manager.build({
    table: "users_info",
    schema: "custom"
  }).select()
    .where('status', '=', 't')
    .order('created_at', 'DESC')

const SelectQueryAddress = Manager.build({
    table: "users_address",
    schema: "custom"
  }).select(["*"])
    .where('number', '=', '100')

const Users = Manager.build({
    table: "users",
    alias: "Testusers",
    schema: "custom"
  }).select(["email", "first_name", "last_name AS FN"])
    .innerJoin(SelectQueryInfo, 'id', 'users_id')
    .leftJoin(SelectQueryAddress, 'id', 'users_id')
    .where('first_name', '=', 'first_name_test')
    .execute()
//SELECT Testusers.email, Testusers.first_name, Testusers.last_name AS FN, users_address.* FROM custom.users AS Testusers INNER JOIN custom.users_info AS users_info ON Testusers.id = users_info.users_id LEFT JOIN custom.users_address AS users_address ON Testusers.id = users_address.users_id WHERE Testusers.first_name = $1 AND users_info.status = $2 AND users_address.number = $3 ORDER BY users_info.created_at DESC 

```


INSERT

```js
const data = {
  email: 'test@test.com',
  first_name: 'Test'
}

const Users = Manager.build({
    table: "users",
    schema: "custom"
  }).insert(data)
  .returning()
  .execute()
//INSERT INTO custom.user (email, first_name) VALUES ($1, $2) RETURNING *
```

UPDATE

```js
const data = {
  email: 'test1@test.com',
  first_name: 'Test1'
}

const Users = Manager.build({
    table: "users",
    schema: "custom"
  }).update(data)
  .where("id", "=", "123")
  .execute()
//UPDATE custom.users AS users SET email = $1, first_name = $2 WHERE users.id = $3
```

DELETE

```js

const Users = Manager.build({
    table: "users",
    schema: "custom"
  }).delete()
  .where("id", "=", "123")
  .execute()
//DELETE FROM custom.users AS users WHERE users.id = $1
```

## License

MIT Licensed, Copyright (c) 2018 Aleksandr Sokol