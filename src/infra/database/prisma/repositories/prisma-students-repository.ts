import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { StudentsRepository } from '@/infra/domain/finance/application/repositories/students-repository'
import { PrismaStudentMapper } from '../mappers/prisma-student-mapper'
import { Student } from '@/infra/domain/finance/enterprise'

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!student) {
      return null
    }

    return PrismaStudentMapper.toDomain(student)
  }

  async create(student: Student): Promise<void> {
    const data = PrismaStudentMapper.toPrisma(student)

    await this.prisma.user.create({
      data,
    })
  }
}
