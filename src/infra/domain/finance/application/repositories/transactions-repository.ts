import { Transaction } from '@/infra/domain/finance'

export abstract class TransactionsRepository {
  abstract create(transaction: Transaction): Promise<void>
}
