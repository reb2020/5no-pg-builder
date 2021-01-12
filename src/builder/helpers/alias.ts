export default function(): string {
  return this.state.alias ?? this.state.table
}
