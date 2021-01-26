import pg from 'pg'

export namespace FiveNoPgBuilder {
  interface Builder {
    rowsHandler: RowsHandler;
    sql: Array<string>;
    boundVars: Array<any>;
    state: State;
    helpers: Helpers;
    methods: Methods;
    operations: Operations;
    _initMethod: () => void;
    _rowsHandler: <R extends {}>(rows: R[]) => Promise<R[]>;
    query: () => {
        query: string;
        vars: any[];
    };

    execute: <R>() => Promise<Result>;
    rows: <R>() => Promise<unknown>;
    result: <R>() => Promise<unknown>;
    instance: () => Builder;
  }

  interface Env {
    DATABASE_URL: string;
    DATABASE_QUERY_LOG: boolean;
  }

  interface Config {
    user?: string;
    database?: string;
    password?: string;
    port?: number;
    host?: string;
    connectionString?: string;
    keepAlive?: boolean;
    statement_timeout?: false | number;
    parseInputDatesAsUTC?: boolean;
    ssl?: boolean;
    query_timeout?: number;
    keepAliveInitialDelayMillis?: number;
    idle_in_transaction_session_timeout?: number;
    application_name?: string;
    connectionTimeoutMillis?: number;
  }

  type OperatorsTypes = 'IS' | 'IS NOT' | 'IN' | 'BETWEEN' | 'NOT BETWEEN' | '=';

  type Query = <R>(q: string, valuesIn?: Array<string>) => Promise<pg.QueryResult<R>>;

  interface Field {
    table: string;
    name: string;
    alias: string;
    function: string | null;
  }

  interface Having {
    table: string;
    name: string;
    value?: any;
    function: string | null;
    operator: string;
    boundValue: string;
  }

  type WhereTypes = 'AND' | 'OR';

  interface Where {
    group: string;
    type: WhereTypes;
    field: string;
    table: string;
    operator: OperatorsTypes;
    values: any[] | null;
    boundValues: Array<string>;
  }

  type JoinTypes = 'INNER' | 'LEFT' | 'RIGHT' | 'JOIN';

  interface Join {
    type: JoinTypes;
    builder: Builder;
    secondaryTable: string;
    primaryTableFieldName: string;
    primaryTableField: string;
    secondaryTableFieldName: string;
    secondaryTableField: string;
    secondaryTableJoin: Array<string>;
    secondaryTableFields: Array<Field>;
    secondaryTableWhere: Array<Where>;
    secondaryTableOrder: Array<Order>;
    secondaryTableGroup: Array<string>;
    secondaryTableHaving: Array<Having>;
  }

  interface JoinProps {
    isUpdateMethod?: boolean;
    isDeleteMethod?: boolean;
  }

  interface Insert {
    fields: Array<string>;
    values: Array<string>;
  }

  type OrderDirections = 'ASC' | 'DESC';

  interface Order {
    field: string;
    direction: OrderDirections;
  }

  interface Update {
    fields: Array<string>;
    values: Array<string>;
  }

  interface State {
    method?: 'count' | 'insert' | 'update' | 'select' | 'delete';
    table?: string;
    alias?: string;
    schema?: string;
    distinct?: boolean;
    fields?: Array<Field>;
    having?: Array<Having>;
    join?: Array<Join>;
    order?: Array<Order>;
    where?: Array<Where>;
    insert?: Insert;
    update?: Update;
    group?: Array<string>;
    returning?: Array<string>;
    conflict?: {
      fields?: Array<string>;
      method: 'NOTHING' | 'UPDATE' | NULL;
      updateFields: null | Array<string>;
    };
    limit?: {
      limit: number;
      offset: number | null;
    };
  }

  type Helper = (...args: any[]) => any;

  interface Helpers {
    [key: string]: Helper;
  }

  type Method = (...args: any[]) => any;

  interface Methods {
    [key: string]: Method;
  }

  type Operation = (...args: any[]) => any;

  interface Operations {
    [key: string]: Operation;
  }

  type RowsHandler = <R extends {}>(rows: Array<R>, method?: string) => Array<R>;

  interface Result {
    [key: string]: any;
  }

  interface Build {
    table: string;
    schema: string;
    alias?: string;
    rowsHandler?: RowsHandler;
  }

  interface InsertData {
    [field: string]: any;
  }

  interface UpdateData {
    [field: string]: any | {
      builder: Builder;
      field: string;
    };
  }

  interface WhereData {
    type: WhereTypes;
    field: string;
    operator: OperatorsTypes;
    values: any;
    group: string;
  }
}
