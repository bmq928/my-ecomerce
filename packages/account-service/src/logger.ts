import winston, { format, transports } from 'winston'

const { combine, timestamp, printf } = format

winston.add(
  new transports.Console({
    format: combine(
      timestamp(),
      printf(
        info =>
          `[${info.level.toUpperCase()}][${info.timestamp}]: ${
            info.message.split('\n')[0]
          }`
      )
    ),
  })
)
