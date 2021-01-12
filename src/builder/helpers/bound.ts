export default function(value: any) {
  if (typeof value === 'object') {
    return '$' + this.boundVars.push(JSON.stringify(value))
  }
  return '$' + this.boundVars.push(value)
}
