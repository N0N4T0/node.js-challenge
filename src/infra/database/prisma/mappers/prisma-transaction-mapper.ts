import { TransactionType, UniqueEntityID } from '@/core'
import { Transaction } from '@/infra/domain/finance/enterprise'
import { Transaction as PrismaTransaction, Prisma } from '@prisma/client'

const TransactionTypeToPrisma = {
  CREDIT: 'CREDIT' as const,
  DEBIT: 'DEBIT' as const,
}

export class PrismaTransactionMapper {
  static toDomain(raw: PrismaTransaction): Transaction {
    return Transaction.create(
      {
        description: raw.description,
        type: TransactionType[raw.type],
        userId: raw.userId ? new UniqueEntityID(raw.userId) : null,
        value: new Prisma.Decimal(raw.value).toNumber(),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    transaction: Transaction,
  ): Prisma.TransactionUncheckedCreateInput {
    return {
      description: transaction.description,
      type: TransactionTypeToPrisma[transaction.type],
      userId: transaction.userId ? transaction.userId.toString() : null,
      value: new Prisma.Decimal(transaction.value).toNumber(),
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
      id: transaction.id.toString(),
    }
  }
}
