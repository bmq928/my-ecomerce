import redis from 'redis'
import config from 'config'

const redisConfig = config.get('db.redis')
const client = redis.createClient(redisConfig)



export { client }
