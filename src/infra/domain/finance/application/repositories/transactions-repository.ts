import { Transaction } from '@/infra/domain/finance/enterprise/entities/transaction'

export abstract class TransactionsRepository {
  abstract create(transaction: Transaction): Promise<void>
}
