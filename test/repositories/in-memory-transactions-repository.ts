import { Transaction, TransactionsRepository } from '@/infra/domain/finance'

export class InMemoryTransactionsRepository implements TransactionsRepository {
  public items: Transaction[] = []

  async create(transaction: Transaction) {
    this.items.push(transaction)
  }
}
