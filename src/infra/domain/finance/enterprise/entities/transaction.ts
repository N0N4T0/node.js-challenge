import { Entity, Optional, TransactionType, UniqueEntityID } from '@/core'

export interface TransactionProps {
  userId: UniqueEntityID | null
  description: string
  value: number
  type: TransactionType
  createdAt: Date
  updatedAt?: Date | null
}

export class Transaction extends Entity<TransactionProps> {
  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  get type() {
    return this.props.type
  }

  set type(type: TransactionType) {
    this.props.type = type
    this.touch()
  }

  get value() {
    return this.props.value
  }

  set value(value: number) {
    this.props.value = value
    this.touch()
  }

  get userId() {
    return this.props.userId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<TransactionProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ) {
    const transaction = new Transaction(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return transaction
  }
}
