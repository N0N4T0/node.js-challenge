import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { TransactionType } from '@/core'
import { CreateTransactionUseCase } from '@/infra/domain/finance'
import { z } from 'zod'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const createTransactionBodySchema = z.object({
  description: z.string(),
  value: z.number(),
  type: z.nativeEnum(TransactionType),
})

const bodyValidationPipe = new ZodValidationPipe(createTransactionBodySchema)

type CreateTransactionBodySchema = z.infer<typeof createTransactionBodySchema>

@Controller('/transactions')
export class CreateTransactionController {
  constructor(private createTransaction: CreateTransactionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateTransactionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { description, type, value } = body
    const userId = user.sub

    const result = await this.createTransaction.execute({
      userId,
      description,
      value,
      type,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
