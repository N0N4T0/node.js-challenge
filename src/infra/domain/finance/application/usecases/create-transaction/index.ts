import { Injectable } from '@nestjs/common'
import { Transaction, TransactionsRepository } from '@/infra/domain/finance'
import { Either, right, TransactionType, UniqueEntityID } from '@/core'

export interface TransactionUseCaseRequest {
  userId: string
  description: string
  value: number
  type: TransactionType
}

type TransactionUseCaseResponse = Either<
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
  }: TransactionUseCaseRequest): Promise<TransactionUseCaseResponse> {
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
