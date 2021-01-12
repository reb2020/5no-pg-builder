export default function(withAlias: boolean = false): string | null {
  if (this.state?.returning) {
    const data: Array<string> = []

    this.state.returning.forEach((field: string) => {
      if (withAlias === true) {
        data.push(this.helpers.field(field))
      } else {
        data.push(field)
      }
    })

    return data.join(', ')
  }

  return null
}
