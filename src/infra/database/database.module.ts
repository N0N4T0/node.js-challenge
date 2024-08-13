import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'

import {
  StudentsRepository,
  TransactionsRepository,
} from '@/infra/domain/finance'
import {
  PrismaStudentsRepository,
  PrismaTransactionsRepository,
} from '@/infra/database/prisma'

@Module({
  providers: [
    PrismaService,
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: TransactionsRepository,
      useClass: PrismaTransactionsRepository,
    },
  ],
  exports: [PrismaService, StudentsRepository, TransactionsRepository],
})
export class DatabaseModule {}
