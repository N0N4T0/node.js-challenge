import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { DeleteTransactionUseCase } from '@/infra/domain/finance'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

@Controller('/transactions/:id')
export class DeleteTransactionController {
  constructor(private deleteTransaction: DeleteTransactionUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') transactionId: string,
  ) {
    const userId = user.sub

    const result = await this.deleteTransaction.execute({
      userId,
      transactionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
