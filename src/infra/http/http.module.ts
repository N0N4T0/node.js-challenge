import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/infra/database/database.module'

import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import {
  AuthenticateController,
  CreateAccountController,
  CreateTransactionController,
  DeleteTransactionController,
  EditTransactionController,
} from './controllers'

import {
  AuthenticateStudentUseCase,
  RegisterStudentUseCase,
  CreateTransactionUseCase,
  EditTransactionUseCase,
  DeleteTransactionUseCase,
} from '@/infra/domain/finance/application'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateTransactionController,
    EditTransactionController,
    DeleteTransactionController,
  ],
  providers: [
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    CreateTransactionUseCase,
    EditTransactionUseCase,
    DeleteTransactionUseCase,
  ],
})
export class HttpModule {}
