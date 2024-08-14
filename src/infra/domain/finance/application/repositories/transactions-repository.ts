import { PaginationParams } from '@/core'
import { Transaction } from '@/infra/domain/finance/enterprise/entities/transaction'

export abstract class TransactionsRepository {
  abstract create(transaction: Transaction): Promise<void>

  abstract save(transaction: Transaction): Promise<void>

  abstract findById(id: string): Promise<Transaction | null>

  abstract delete(transaction: Transaction): Promise<void>

  abstract findManyByPeriod(params: PaginationParams): Promise<Transaction[]>
}
