import { TransactionType, UniqueEntityID } from '@/core'
import { PrismaTransactionMapper } from '@/infra/database/prisma'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import {
  Transaction,
  TransactionProps,
} from '@/infra/domain/finance/enterprise/entities/transaction'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

const transactionTypeArrayElement = [
  TransactionType.CREDIT,
  TransactionType.DEBIT,
]

function getRandomTransactionType(
  transactionTypeArrayElement: TransactionType[],
) {
  const randomIndex = Math.floor(
    Math.random() * transactionTypeArrayElement.length,
  )
  const randomElement = transactionTypeArrayElement[randomIndex]
  return randomElement
}

export function makeTransaction(
  override: Partial<TransactionProps> = {},
  id?: UniqueEntityID,
) {
  const transaction = Transaction.create(
    {
      userId: new UniqueEntityID(),
      description: faker.lorem.sentence(),
      value: faker.number.float(),
      type: getRandomTransactionType(transactionTypeArrayElement),
      ...override,
    },
    id,
  )

  return transaction
}

@Injectable()
export class TransactionFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaTransaction(
    data: Partial<TransactionProps> = {},
  ): Promise<Transaction> {
    const transaction = makeTransaction(data)

    await this.prisma.transaction.create({
      data: PrismaTransactionMapper.toPrisma(transaction),
    })

    return transaction
  }
}
