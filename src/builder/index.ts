import Methods from './methods'
import Operations from './operations'
import Helpers from './helpers'

import { FiveNoPgBuilder } from '../../typings/app'

class Builder {
  private pool: FiveNoPgBuilder.Query

  public rowsHandler: FiveNoPgBuilder.RowsHandler = <R>(rows: Array<R>) => rows

  public sql: Array<string> = []

  public boundVars: Array<any> = []

  public state: FiveNoPgBuilder.State = {}

  public helpers: FiveNoPgBuilder.Helpers = {}

  public methods: FiveNoPgBuilder.Methods = {}

  public operations: FiveNoPgBuilder.Operations

  constructor(pool: FiveNoPgBuilder.Query) {
    this.pool = pool

    Object.keys(Helpers).forEach((key) => {
      this.helpers[key] = Helpers[key].bind(this)
    })

    Object.keys(Methods).forEach((key) => {
      this.methods[key] = Methods[key].bind(this)
    })

    this.operations = {
      execute: this.execute,
      rows: this.rows,
      result: this.result,
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

  _rowsHandler = <R extends {}>(rows: Array<R>) => new Promise((resolve, reject) => {
    Promise.resolve(this.rowsHandler(rows, this.state.method)).then(resolve).catch(reject)
  })

  query = () => {
    this._initMethod()
    return {
      query: this.sql.join(' '),
      vars: this.boundVars,
    }
  }

  execute = <R>() => {
    const queryData = this.query()
    const pool = this.pool

    return new Promise<FiveNoPgBuilder.Result>((resolve, reject) => {
      pool<R>(queryData.query, queryData.vars).then((result) => {
        if (typeof result === 'object' && this.state.method !== 'count') {
          this._rowsHandler<R>(result.rows || []).then((rows) => {
            resolve({ ...result, rows: rows })
          }).catch(reject)
        } else {
          resolve(result)
        }
      }).catch(reject)
    })
  }

  rows = <R>() => new Promise((resolve, reject) => {
    this.execute<R>().then((result) => {
      resolve(result.rows ?? [])
    }).catch(reject)
  })

  result = <R>() => {
    if (this.state.method !== 'count') {
      throw new Error('This method is used only for count')
    }
    return new Promise((resolve, reject) => {
      this.execute<R>().then((result) => {
        resolve(result.rows.reduce((acc: number, { count_rows }: any) => acc + Number(count_rows), 0))
      }).catch(reject)
    })
  }

  instance = () => this
}

export default Builder
