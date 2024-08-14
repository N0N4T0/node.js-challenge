import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Transaction } from '@/infra/domain/finance/enterprise/entities/transaction'
import { TransactionsRepository } from '@/infra/domain/finance/application/repositories'
import { InvalidRangeDateError } from '../errors/invalid-range-date-error'

interface GetTransactionsUseCaseRequest {
  page: number
  initialDate?: Date
  finalDate?: Date
}

type GetTransactionsUseCaseResponse = Either<
  InvalidRangeDateError,
  {
    transactions: Transaction[]
  }
>

@Injectable()
export class GetTransactionsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    page,
    finalDate,
    initialDate,
  }: GetTransactionsUseCaseRequest): Promise<GetTransactionsUseCaseResponse> {
    const isInvalidRange =
      (!initialDate && finalDate) || (initialDate && !finalDate)

    if (isInvalidRange) {
      return left(new InvalidRangeDateError())
    }

    const transactions = await this.transactionsRepository.findManyByPeriod({
      page,
      finalDate,
      initialDate,
    })

    return right({
      transactions,
    })
  }
}
