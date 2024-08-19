import { HttpException, HttpStatus } from '@nestjs/common'

export class NotAllowedException extends HttpException {
  constructor() {
    super('Not allowed', HttpStatus.UNAUTHORIZED)
  }
}
