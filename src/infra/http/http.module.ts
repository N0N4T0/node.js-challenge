import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/infra/database/database.module'

import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { CreateAccountController, AuthenticateController } from './controllers'

import {
  AuthenticateStudentUseCase,
  RegisterStudentUseCase,
} from '@/infra/domain/finance/application'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateAccountController, AuthenticateController],
  providers: [RegisterStudentUseCase, AuthenticateStudentUseCase],
})
export class HttpModule {}
