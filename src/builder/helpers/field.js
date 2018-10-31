export default function(field) {
  const alias = this.helpers.alias()
  return alias + '.' + field
}
