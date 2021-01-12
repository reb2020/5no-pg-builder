import { FiveNoPgBuilder } from '../../../typings/app'

export default function(): string | null {
  const order: Array<string> = []

  if (this.state?.order) {
    this.state.order.forEach((orderData: FiveNoPgBuilder.Order) => {
      order.push(`${orderData.field} ${orderData.direction}`)
    })

    return `ORDER BY ${order.join(', ')}`
  }

  return null
}
