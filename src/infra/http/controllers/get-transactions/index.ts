import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { GetTransactionsUseCase } from '@/infra/domain/finance'
import { TransactionPresenter } from '../../presenters/transaction-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/transactions')
export class GetTransactionsController {
  constructor(private getTransactions: GetTransactionsUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.getTransactions.execute({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const transactions = result.value.transactions

    return { transactions: transactions.map(TransactionPresenter.toHTTP) }
  }
}
