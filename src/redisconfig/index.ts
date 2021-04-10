import Redis from 'ioredis';

// redis.set('helo', 'this is with ioredis').then(console.log);
// redis.get('helo', (err, res) => console.log(res));

class TokenStore {
  redis: Redis.Redis;
  constructor() {
    this.redis = new Redis(process.env.REDIS_URL);
  }

  public async setToken(key: string, value: string) {
    try {
      await this.redis.lpush(key, value);
      const size = await this.redis.llen(key);
      if (size > 3) {
        await this.redis.rpop(key);
        console.log(size);
      }
      // this.redis.llen(key, (err, res) => {
      //   if (err) console.error(err);
      //   else {
      //     console.log(res);
      //   }
      // });
    } catch (e) {
      console.error(e.message);
    }
  }
  public async getAll(key: string): Promise<string[]> {
    const arr = await this.redis.lrange(key, 0, -1);
    return arr;
  }
}

export const tokenStore = new TokenStore();
