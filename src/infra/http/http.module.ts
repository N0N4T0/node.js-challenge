import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import {
  AuthenticateStudentUseCase,
  RegisterStudentUseCase,
} from '../domain/finance/application/usecases'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { CreateAccountController, AuthenticateController } from './controllers'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateAccountController, AuthenticateController],
  providers: [RegisterStudentUseCase, AuthenticateStudentUseCase],
})
export class HttpModule {}
