import { Student, StudentsRepository } from '@/infra/domain/finance'

export class InMemoryStudentsRepository implements StudentsRepository {
  public items: Student[] = []

  async findByEmail(email: string) {
    const student = this.items.find((item) => item.email === email)

    if (!student) {
      return null
    }

    return student
  }

  async create(student: Student) {
    this.items.push(student)
  }
}
