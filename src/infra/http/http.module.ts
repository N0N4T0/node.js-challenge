import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/infra/database/database.module'

import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import {
  AuthenticateController,
  CreateAccountController,
  CreateTransactionController,
  EditTransactionController,
} from './controllers'

import {
  AuthenticateStudentUseCase,
  RegisterStudentUseCase,
  CreateTransactionUseCase,
  EditTransactionUseCase,
} from '@/infra/domain/finance/application'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateTransactionController,
    EditTransactionController,
  ],
  providers: [
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    CreateTransactionUseCase,
    EditTransactionUseCase,
  ],
})
export class HttpModule {}
