import Methods from './methods'
import Operations from './operations'
import Helpers from './helpers'

class Builder {
  constructor(pool) {
    this.pool = pool

    this.rowsHandler = rows => rows
    this.sql = []
    this.boundVars = []

    this.state = {
      method: null,
    }

    this.helpers = {}

    Object.keys(Helpers).forEach((key) => {
      this.helpers[key] = Helpers[key].bind(this)
    })

    this.methods = {}

    Object.keys(Methods).forEach((key) => {
      this.methods[key] = Methods[key].bind(this)
    })

    this.operations = {
      execute: this.execute,
      rows: this.rows,
      query: this.query,
      instance: this.instance,
    }

    Object.keys(Operations).forEach((key) => {
      this.operations[key] = Operations[key].bind(this)
    })
  }

  _initMethod = () => {
    switch (this.state.method) {
      case 'select':
        this.methods.select()
        break
      case 'count':
        this.methods.count()
        break
      case 'insert':
        this.methods.insert()
        break
      case 'update':
        this.methods.update()
        break
      case 'delete':
        this.methods.delete()
        break
    }
  }

  _rowsHandler = (rows) => {
    return new Promise((resolve, reject) => {
      Promise.resolve(this.rowsHandler(rows, this.state.method)).then(resolve).catch(reject)
    })
  }

  query = () => {
    this._initMethod()
    return {
      query: this.sql.join(' '),
      vars: this.boundVars,
    }
  }

  execute = () => {
    const queryData = this.query()
    const pool = this.pool

    return new Promise((resolve, reject) => {
      pool(queryData.query, queryData.vars).then((result) => {
        if (typeof result === 'object') {
          this._rowsHandler(result.rows || []).then((rows) => {
            resolve({ ...result, rows: rows })
          }).catch(reject)
        } else {
          resolve(result)
        }
      }).catch(reject)
    })
  }

  rows = () => {
    return new Promise((resolve, reject) => {
      this.execute().then((result) => {
        resolve(result.rows || [])
      }).catch(reject)
    })
  }

  instance = () => {
    return this
  }
}

module.exports = Builder
