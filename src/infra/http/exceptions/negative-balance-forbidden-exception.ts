import { HttpException, HttpStatus } from '@nestjs/common'

export class NegativeBalanceForbiddenException extends HttpException {
  constructor() {
    super('Operation will negative balance', HttpStatus.FORBIDDEN)
  }
}
