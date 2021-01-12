import { FiveNoPgBuilder } from '../../../typings/app'

export default function({
  type = 'LEFT',
  builder,
  primaryTableField,
  secondaryTableField,
}: {
  type: FiveNoPgBuilder.JoinTypes;
  builder: FiveNoPgBuilder.Builder;
  primaryTableField: string;
  secondaryTableField: string;
}): FiveNoPgBuilder.Join {
  const secondaryTable = builder.instance()

  const join = {
    type: type,
    builder: builder,
    secondaryTable: secondaryTable.helpers.table(true),
    primaryTableFieldName: primaryTableField,
    primaryTableField: this.helpers.field(primaryTableField),
    secondaryTableFieldName: secondaryTableField,
    secondaryTableField: secondaryTable.helpers.field(secondaryTableField),
    secondaryTableJoin: secondaryTable.helpers.join(),
    secondaryTableFields: secondaryTable.state.fields || [],
    secondaryTableWhere: secondaryTable.state.where || [],
    secondaryTableOrder: secondaryTable.state.order || [],
    secondaryTableGroup: secondaryTable.state.group || [],
    secondaryTableHaving: secondaryTable.state.having || [],
  }

  return join
}
