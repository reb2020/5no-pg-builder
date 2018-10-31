export default function() {
  let order = []

  if (this.state.order) {
    this.state.order.forEach((orderData) => {
      order.push(`${orderData.field} ${orderData.direction}`)
    })

    return `ORDER BY ${order.join(', ')}`
  }

  return null
}
