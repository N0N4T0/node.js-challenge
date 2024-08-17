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
} from '@/core'

export interface DeleteTransactionUseCaseRequest {
  userId: string
  transactionId: string
}

type DeleteTransactionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    transaction: Transaction
  }
>

@Injectable()
export class DeleteTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    userId,
    transactionId,
  }: DeleteTransactionUseCaseRequest): Promise<DeleteTransactionUseCaseResponse> {
    const transaction =
      await this.transactionsRepository.findById(transactionId)

    const { extract } = await this.transactionsRepository.getBalance()

    if (!transaction) {
      return left(new ResourceNotFoundError())
    }

    if (userId !== transaction.userId?.toString()) {
      return left(new NotAllowedError())
    }

    const willNegativeBalance = extract < 0

    if (willNegativeBalance) {
      return left(new NegativeBalanceError())
    }

    await this.transactionsRepository.delete(transaction)

    return right({
      transaction,
    })
  }
}
