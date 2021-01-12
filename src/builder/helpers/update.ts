export default function(): string | null {
  if (this.state?.update) {
    const data: Array<string> = []
    let index = 0

    this.state.update.fields.forEach((field: string) => {
      data.push(`${field} = ${this.state.update.values[index]}`)
      index++
    })

    return data.join(', ')
  }

  return null
}
