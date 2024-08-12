import { Module } from '@nestjs/common'

import { HashComparer } from '../domain/finance/application/cryptography/hash-comparer'
import { HashGenerator } from '../domain/finance/application/cryptography/hash-generator'
import { Encrypter } from '../domain/finance/application/cryptography/encrypter'

import { JwtEncrypter } from './jwt-encrypter'
import { BcryptHasher } from './bcrypt-hasher'

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
