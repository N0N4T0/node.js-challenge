import {
  TransactionsBalance,
  TransactionsPaginationParams,
  TransactionType,
} from '@/core'
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

  async delete(transaction: Transaction) {
    const itemIndex = this.items.findIndex((item) => item.id === transaction.id)

    this.items.splice(itemIndex, 1)
  }

  async getBalance(): Promise<TransactionsBalance> {
    const allCredits = this.items.filter(
      (credit) => credit.type === TransactionType.CREDIT,
    )
    const sumOfCredits = allCredits.reduce((acc, prev) => acc + prev.value, 0)

    const allDebits = this.items.filter(
      (debit) => debit.type === TransactionType.DEBIT,
    )
    const sumOfDebits = allDebits.reduce((acc, prev) => acc + prev.value, 0)

    const balance = sumOfCredits - sumOfDebits

    return {
      extract: balance,
      sumOfCredits,
      sumOfDebits,
    }
  }

  async findManyByPeriod({ page }: TransactionsPaginationParams) {
    const transactions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return transactions
  }
}
