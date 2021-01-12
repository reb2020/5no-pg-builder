export default function(field: string): string {
  const alias = this.helpers.alias()
  return alias + '.' + field
}
