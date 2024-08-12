import { Module } from '@nestjs/common'

import { JwtEncrypter } from './jwt-encrypter'
import { BcryptHasher } from './bcrypt-hasher'

import { Encrypter, HashComparer, HashGenerator } from '@/infra/domain/finance'

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
