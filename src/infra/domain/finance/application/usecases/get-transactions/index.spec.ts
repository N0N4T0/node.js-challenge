import { InMemoryTransactionsRepository, makeTransaction } from 'test'
import { GetTransactionsUseCase } from '.'

let inMemoryTransactionsRepository: InMemoryTransactionsRepository

let sut: GetTransactionsUseCase

describe('Get Transactions', () => {
  beforeEach(() => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository()

    sut = new GetTransactionsUseCase(inMemoryTransactionsRepository)
  })

  it('should be able to get transactions', async () => {
    await inMemoryTransactionsRepository.create(
      makeTransaction({ createdAt: new Date(2022, 0, 20) }),
    )
    await inMemoryTransactionsRepository.create(
      makeTransaction({ createdAt: new Date(2022, 0, 18) }),
    )
    await inMemoryTransactionsRepository.create(
      makeTransaction({ createdAt: new Date(2022, 0, 23) }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.transactions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })

  it('should be able to fetch paginated recent transactions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryTransactionsRepository.create(makeTransaction())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.transactions).toHaveLength(2)
  })
})
