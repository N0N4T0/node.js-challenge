import { UseCaseError } from '@/core/errors/use-case-error'

export class NegativeBalanceError extends Error implements UseCaseError {
  constructor() {
    super('Operation will negative balance')
  }
}
