import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { TransactionsRepository } from '@/infra/domain/finance'
import { PrismaTransactionMapper } from '../mappers'
import { Transaction } from '@/infra/domain/finance/enterprise'

@Injectable()
export class PrismaTransactionsRepository implements TransactionsRepository {
  constructor(private prisma: PrismaService) {}

  async create(transaction: Transaction): Promise<void> {
    const data = PrismaTransactionMapper.toPrisma(transaction)

    await this.prisma.transaction.create({
      data,
    })
  }
}
