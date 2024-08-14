import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { GetTransactionsUseCase } from '@/infra/domain/finance'
import { TransactionPresenter } from '../../presenters/transaction-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)

const dateQueryParamSchema = z.string().optional().pipe(z.date().optional())

const queryParamsSchema = z.object({
  page: pageQueryParamSchema,
  initialDate: dateQueryParamSchema,
  finalDate: dateQueryParamSchema,
})

type QueryParamsSchema = z.infer<typeof queryParamsSchema>

@Controller('/transactions')
export class GetTransactionsController {
  constructor(private getTransactions: GetTransactionsUseCase) {}

  @Get()
  async handle(
    @Query()
    queryParams: QueryParamsSchema,
  ) {
    const { page, initialDate, finalDate } = queryParams

    const result = await this.getTransactions.execute({
      page,
      finalDate,
      initialDate,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const transactions = result.value.transactions

    return { transactions: transactions.map(TransactionPresenter.toHTTP) }
  }
}
