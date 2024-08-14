import { Transaction } from '@/infra/domain/finance/enterprise/entities/transaction'

export class TransactionPresenter {
  static toHTTP(transaction: Transaction) {
    return {
      id: transaction.id.toString(),
      description: transaction.description,
      value: transaction.value,
      type: transaction.type,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    }
  }
}
