import { InMemoryTransactionsRepository, makeTransaction } from 'test'
import { GetTransactionsBalanceUseCase } from '.'
import { TransactionType, UniqueEntityID } from '@/core'

let inMemoryTransactionsRepository: InMemoryTransactionsRepository

let sut: GetTransactionsBalanceUseCase

describe('Get Transactions Balance', () => {
  beforeEach(() => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository()

    sut = new GetTransactionsBalanceUseCase(inMemoryTransactionsRepository)
  })

  it('should be able get transactions balance', async () => {
    await Promise.all([
      inMemoryTransactionsRepository.create(
        makeTransaction({
          userId: new UniqueEntityID('User 1'),
          type: TransactionType.CREDIT,
          value: 10,
        }),
      ),
      inMemoryTransactionsRepository.create(
        makeTransaction({
          userId: new UniqueEntityID('User 1'),
          type: TransactionType.CREDIT,
          value: 20,
        }),
      ),
      inMemoryTransactionsRepository.create(
        makeTransaction({
          userId: new UniqueEntityID('User 1'),
          type: TransactionType.DEBIT,
          value: 5,
        }),
      ),
      inMemoryTransactionsRepository.create(
        makeTransaction({
          userId: new UniqueEntityID('User 1'),
          type: TransactionType.DEBIT,
          value: 15,
        }),
      ),
    ])

    const { extract, sumOfCredits, sumOfDebits } =
      await inMemoryTransactionsRepository.getBalance()

    expect(extract).toBe(10)
    expect(sumOfCredits).toBe(30)
    expect(sumOfDebits).toBe(20)
  })
})
