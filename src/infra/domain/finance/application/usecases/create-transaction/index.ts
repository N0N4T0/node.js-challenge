import { Injectable } from '@nestjs/common'
import { Transaction } from '@/infra/domain/finance/enterprise/entities/transaction'
import { TransactionsRepository } from '@/infra/domain/finance/application/repositories/transactions-repository'
import { Either, right, TransactionType, UniqueEntityID } from '@/core'

export interface CreateTransactionUseCaseRequest {
  userId: string
  description: string
  value: number
  type: TransactionType
}

type CreateTransactionUseCaseResponse = Either<
  null,
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
    // TODO validate balance before create a transaction
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
