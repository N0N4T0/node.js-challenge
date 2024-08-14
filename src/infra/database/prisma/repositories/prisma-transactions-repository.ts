import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { TransactionsRepository } from '@/infra/domain/finance'
import { PrismaTransactionMapper } from '../mappers'
import { Transaction } from '@/infra/domain/finance/enterprise'
import {
  TransactionsBalance,
  TransactionsPaginationParams,
  TransactionType,
} from '@/core'

@Injectable()
export class PrismaTransactionsRepository implements TransactionsRepository {
  constructor(private prisma: PrismaService) {}

  async create(transaction: Transaction): Promise<void> {
    const data = PrismaTransactionMapper.toPrisma(transaction)

    await this.prisma.transaction.create({
      data,
    })
  }

  async findById(id: string): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id,
      },
    })

    if (!transaction) {
      return null
    }

    return PrismaTransactionMapper.toDomain(transaction)
  }

  async findManyByPeriod({
    page,
    finalDate,
    initialDate,
  }: TransactionsPaginationParams): Promise<Transaction[]> {
    const startDate = initialDate
      ? new Date(initialDate).toISOString()
      : initialDate
    const endDate = finalDate ? new Date(finalDate).toISOString() : finalDate

    const transactions = await this.prisma.transaction.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
      where: {
        createdAt: {
          lte: endDate,
          gte: startDate,
        },
      },
    })

    return transactions.map(PrismaTransactionMapper.toDomain)
  }

  async getBalance(): Promise<TransactionsBalance> {
    const result = await Promise.all([
      this.prisma.transaction.findMany({
        where: {
          type: TransactionType.CREDIT,
        },
      }),
      this.prisma.transaction.findMany({
        where: {
          type: TransactionType.DEBIT,
        },
      }),
    ])

    const [allCredits, allDebits] = result

    const allCreditsMapper = allCredits.map(PrismaTransactionMapper.toDomain)
    const allDebitsMapper = allDebits.map(PrismaTransactionMapper.toDomain)

    const sumOfCredits = allCreditsMapper.reduce(
      (acc, prev) => acc + prev.value,
      0,
    )
    const sumOfDebits = allDebitsMapper.reduce(
      (acc, prev) => acc + prev.value,
      0,
    )

    const balance = {
      extract: sumOfCredits - sumOfDebits,
      sumOfCredits,
      sumOfDebits,
    }

    return balance
  }

  async save(transaction: Transaction): Promise<void> {
    const data = PrismaTransactionMapper.toPrisma(transaction)

    await this.prisma.transaction.update({
      where: {
        id: transaction.id.toString(),
      },
      data,
    })
  }

  async delete(transaction: Transaction): Promise<void> {
    const data = PrismaTransactionMapper.toPrisma(transaction)

    await this.prisma.transaction.delete({
      where: {
        id: data.id,
      },
    })
  }
}
