import Redis from 'ioredis'

export const redis = new Redis()
redis
  .ping()
  .then(() => {
    console.log('\nConnected to REDIS ✔️')
  })
  .catch((e) => {
    console.log('Enable to connect REDIS', e.message)
  })
