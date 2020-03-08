import winston from 'winston'

export function handleError<T extends Error>(error: T): void {
  winston.error(error.message)
}
