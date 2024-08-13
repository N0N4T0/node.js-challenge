import { InMemoryTransactionsRepository, makeTransaction } from 'test'
import { EditTransactionUseCase } from '.'
import { NotAllowedError, TransactionType, UniqueEntityID } from '@/core'

let inMemoryTransactionsRepository: InMemoryTransactionsRepository

let sut: EditTransactionUseCase

describe('Edit Transaction', () => {
  beforeEach(() => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository()

    sut = new EditTransactionUseCase(inMemoryTransactionsRepository)
  })

  it('should be able to edit a transaction', async () => {
    const newTransaction = makeTransaction(
      {
        userId: new UniqueEntityID('User 1'),
      },
      new UniqueEntityID('transaction-1'),
    )

    await inMemoryTransactionsRepository.create(newTransaction)

    const creditResult = await sut.execute({
      description: 'Alimentação',
      type: TransactionType.CREDIT,
      value: 800,
      userId: 'User 1',
      transactionId: 'transaction-1',
    })

    expect(creditResult.isRight()).toBe(true)
    expect(inMemoryTransactionsRepository.items[0]).toMatchObject({
      description: 'Alimentação',
      type: TransactionType.CREDIT,
    })
  })

  it('should not be able to edit a transaction from another user', async () => {
    const newTransaction = makeTransaction(
      {
        userId: new UniqueEntityID('User 1'),
      },
      new UniqueEntityID('transaction-1'),
    )

    await inMemoryTransactionsRepository.create(newTransaction)

    const result = await sut.execute({
      transactionId: newTransaction.id.toValue(),
      userId: 'author-2',
      description: 'Pergunta teste',
      type: TransactionType.DEBIT,
      value: 200,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
