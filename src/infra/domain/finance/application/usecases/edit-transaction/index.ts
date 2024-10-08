import { Injectable } from '@nestjs/common'
import { Transaction } from '@/infra/domain/finance/enterprise/entities/transaction'
import { TransactionsRepository } from '@/infra/domain/finance/application/repositories/transactions-repository'
import {
  Either,
  left,
  NegativeBalanceError,
  NotAllowedError,
  ResourceNotFoundError,
  right,
  TransactionType,
} from '@/core'

export interface EditTransactionUseCaseRequest {
  userId: string
  transactionId: string
  description: string
  value: number
  type: TransactionType
}

type EditTransactionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError | NegativeBalanceError,
  {
    transaction: Transaction
  }
>

@Injectable()
export class EditTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    userId,
    description,
    type,
    value,
    transactionId,
  }: EditTransactionUseCaseRequest): Promise<EditTransactionUseCaseResponse> {
    const transaction =
      await this.transactionsRepository.findById(transactionId)

    if (!transaction) {
      return left(new ResourceNotFoundError())
    }

    if (userId !== transaction.userId?.toString()) {
      return left(new NotAllowedError())
    }

    transaction.description = description
    transaction.type = type
    transaction.value = value

    const { extract } = await this.transactionsRepository.getBalance()

    const willNegativeBalance = extract < 0

    if (willNegativeBalance) {
      return left(new NegativeBalanceError())
    }

    await this.transactionsRepository.save(transaction)

    return right({
      transaction,
    })
  }
}
