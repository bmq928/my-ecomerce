import winston from 'winston'

//for handle error that would crash system
//not user exception
export function handleError<T extends Error>(error: T): void {
  winston.error(error.message)
}

export class BusinessError extends Error {}
