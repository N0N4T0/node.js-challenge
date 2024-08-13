import { Transaction, TransactionsRepository } from '@/infra/domain/finance'

export class InMemoryTransactionsRepository implements TransactionsRepository {
  public items: Transaction[] = []

  async create(transaction: Transaction) {
    this.items.push(transaction)
  }

  async findById(id: string) {
    const transaction = this.items.find((item) => item.id.toString() === id)

    if (!transaction) {
      return null
    }

    return transaction
  }

  async save(transaction: Transaction) {
    const itemIndex = this.items.findIndex((item) => item.id === transaction.id)

    this.items[itemIndex] = transaction
  }
}
