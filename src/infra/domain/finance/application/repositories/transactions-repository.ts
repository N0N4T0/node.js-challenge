import { TransactionsBalance, TransactionsPaginationParams } from '@/core'
import { Transaction } from '@/infra/domain/finance/enterprise/entities/transaction'

export abstract class TransactionsRepository {
  abstract create(transaction: Transaction): Promise<void>

  abstract save(transaction: Transaction): Promise<void>

  abstract findById(id: string): Promise<Transaction | null>

  abstract delete(transaction: Transaction): Promise<void>

  abstract getBalance(): Promise<TransactionsBalance>

  abstract findManyByPeriod(
    params: TransactionsPaginationParams,
  ): Promise<Transaction[]>
}
