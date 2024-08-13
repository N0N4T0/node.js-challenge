import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/infra/database/database.module'

import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import {
  AuthenticateController,
  CreateAccountController,
  CreateTransactionController,
} from './controllers'

import {
  AuthenticateStudentUseCase,
  RegisterStudentUseCase,
  CreateTransactionUseCase,
} from '@/infra/domain/finance/application'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateTransactionController,
  ],
  providers: [
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    CreateTransactionUseCase,
  ],
  exports: [CreateTransactionUseCase],
})
export class HttpModule {}
