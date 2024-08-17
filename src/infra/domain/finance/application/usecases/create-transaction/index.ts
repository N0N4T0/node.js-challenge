import { Injectable } from '@nestjs/common'
import { Transaction } from '@/infra/domain/finance/enterprise/entities/transaction'
import { TransactionsRepository } from '@/infra/domain/finance/application/repositories/transactions-repository'
import {
  Either,
  left,
  NegativeBalanceError,
  right,
  TransactionType,
  UniqueEntityID,
} from '@/core'

export interface CreateTransactionUseCaseRequest {
  userId: string
  description: string
  value: number
  type: TransactionType
}

type CreateTransactionUseCaseResponse = Either<
  NegativeBalanceError,
  {
    transaction: Transaction
  }
>

@Injectable()
export class CreateTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    userId,
    description,
    type,
    value,
  }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
    const { extract } = await this.transactionsRepository.getBalance()

    const willNegativeBalance = extract < 0
    const firstTransactionWillNegativeBalance =
      extract === 0 && type === TransactionType.DEBIT

    if (willNegativeBalance || firstTransactionWillNegativeBalance) {
      return left(new NegativeBalanceError())
    }

    const transaction = Transaction.create({
      userId: new UniqueEntityID(userId),
      description,
      type,
      value,
    })

    await this.transactionsRepository.create(transaction)

    return right({
      transaction,
    })
  }
}
