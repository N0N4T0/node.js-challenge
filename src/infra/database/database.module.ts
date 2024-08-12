import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'

import { StudentsRepository } from '@/infra/domain/finance'
import { PrismaStudentsRepository } from '@/infra/database/prisma'

@Module({
  providers: [
    PrismaService,
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
  ],
  exports: [PrismaService, StudentsRepository],
})
export class DatabaseModule {}
