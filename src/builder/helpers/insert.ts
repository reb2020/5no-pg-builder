interface Result {
  fields: string;
  values: string;
}

export default function(): Result | null {
  if (this.state.insert) {
    return {
      fields: this.state.insert.fields.join(', '),
      values: this.state.insert.values.join(', '),
    }
  }

  return null
}
