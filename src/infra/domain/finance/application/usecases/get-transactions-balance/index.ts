import { Injectable } from '@nestjs/common'
import { TransactionsRepository } from '@/infra/domain/finance/application/repositories/transactions-repository'
import { Either, right, TransactionsBalance } from '@/core'

type GetTransactionsBalanceUseCaseResponse = Either<
  null,
  {
    balance: TransactionsBalance
  }
>

@Injectable()
export class GetTransactionsBalanceUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute(): Promise<GetTransactionsBalanceUseCaseResponse> {
    const balance = await this.transactionsRepository.getBalance()

    return right({
      balance,
    })
  }
}
