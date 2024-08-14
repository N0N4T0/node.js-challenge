import { UseCaseError } from '@/core'

export class InvalidRangeDateError extends Error implements UseCaseError {
  constructor() {
    super('Range date are not valid')
  }
}
