import { InMemoryTransactionsRepository, makeTransaction } from 'test'
import { DeleteTransactionUseCase } from '.'
import { NotAllowedError, UniqueEntityID } from '@/core'

let inMemoryTransactionsRepository: InMemoryTransactionsRepository

let sut: DeleteTransactionUseCase

describe('Delete Transaction', () => {
  beforeEach(() => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository()

    sut = new DeleteTransactionUseCase(inMemoryTransactionsRepository)
  })

  it('should be able to delete a transaction', async () => {
    const newTransaction = makeTransaction(
      {
        userId: new UniqueEntityID('User 1'),
      },
      new UniqueEntityID('transaction-1'),
    )

    await inMemoryTransactionsRepository.create(newTransaction)

    await sut.execute({
      userId: 'User 1',
      transactionId: 'transaction-1',
    })

    expect(inMemoryTransactionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a transaction from another user', async () => {
    const newTransaction = makeTransaction(
      {
        userId: new UniqueEntityID('User 1'),
      },
      new UniqueEntityID('transaction-1'),
    )

    await inMemoryTransactionsRepository.create(newTransaction)

    const result = await sut.execute({
      userId: 'User 2',
      transactionId: 'transaction-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
