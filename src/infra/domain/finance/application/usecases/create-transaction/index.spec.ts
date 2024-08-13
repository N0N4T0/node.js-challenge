import { InMemoryTransactionsRepository } from 'test'
import { CreateTransactionUseCase } from '.'
import { TransactionType } from '@/core'

let inMemoryTransactionsRepository: InMemoryTransactionsRepository

let sut: CreateTransactionUseCase

describe('Create Transaction', () => {
  beforeEach(() => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository()

    sut = new CreateTransactionUseCase(inMemoryTransactionsRepository)
  })

  it('should be able to create a transaction', async () => {
    const creditResult = await sut.execute({
      description: 'Alimentação',
      type: TransactionType.CREDIT,
      value: 800,
      userId: 'User 1',
    })

    const debitResult = await sut.execute({
      description: 'Pizza',
      type: TransactionType.DEBIT,
      value: 85.99,
      userId: 'User 1',
    })

    expect(creditResult.isRight()).toBe(true)
    expect(inMemoryTransactionsRepository.items[0]).toEqual(
      creditResult.value?.transaction,
    )
    expect(debitResult.isRight()).toBe(true)
    expect(inMemoryTransactionsRepository.items[1]).toEqual(
      debitResult.value?.transaction,
    )
  })
})
