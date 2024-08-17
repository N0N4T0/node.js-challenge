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
import { NegativeBalanceError, NotAllowedError } from '@/core'
import {
  NegativeBalanceForbiddenException,
  NotAllowedException,
} from '../exceptions'

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
      const error = result.value

      switch (error.constructor) {
        case NegativeBalanceError:
          throw new NegativeBalanceForbiddenException()
        case NotAllowedError:
          throw new NotAllowedException()
        default:
          throw new BadRequestException()
      }
    }
  }
}
