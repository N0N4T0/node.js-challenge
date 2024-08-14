import { BadRequestException, Controller, Get } from '@nestjs/common'
import { GetTransactionsBalanceUseCase } from '@/infra/domain/finance'

@Controller('/transactions/balance')
export class GetTransactionsBalanceController {
  constructor(private getTransactionsBalance: GetTransactionsBalanceUseCase) {}

  @Get()
  async handle() {
    const result = await this.getTransactionsBalance.execute()

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { extract, sumOfCredits, sumOfDebits } = result.value.balance

    return { extract, sumOfCredits, sumOfDebits }
  }
}
