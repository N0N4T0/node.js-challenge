import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Transaction } from '@/infra/domain/finance/enterprise/entities/transaction'
import { TransactionsRepository } from '@/infra/domain/finance/application/repositories'

interface GetTransactionsUseCaseRequest {
  page: number
}

type GetTransactionsUseCaseResponse = Either<
  null,
  {
    transactions: Transaction[]
  }
>

@Injectable()
export class GetTransactionsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    page,
  }: GetTransactionsUseCaseRequest): Promise<GetTransactionsUseCaseResponse> {
    const transactions = await this.transactionsRepository.findManyByPeriod({
      page,
    })

    return right({
      transactions,
    })
  }
}
