import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { StudentsRepository } from '../domain/finance/application/repositories/students-repository'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository'

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
