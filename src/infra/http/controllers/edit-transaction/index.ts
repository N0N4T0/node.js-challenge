import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { TransactionType } from '@/core'
import { EditTransactionUseCase } from '@/infra/domain/finance'
import { z } from 'zod'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const editTransactionBodySchema = z.object({
  description: z.string(),
  value: z.number(),
  type: z.nativeEnum(TransactionType),
})

const bodyValidationPipe = new ZodValidationPipe(editTransactionBodySchema)

type EditTransactionBodySchema = z.infer<typeof editTransactionBodySchema>

@Controller('/transactions/:id')
export class EditTransactionController {
  constructor(private editTransaction: EditTransactionUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditTransactionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') transactionId: string,
  ) {
    const { description, type, value } = body
    const userId = user.sub

    const result = await this.editTransaction.execute({
      description,
      type,
      value,
      userId,
      transactionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
