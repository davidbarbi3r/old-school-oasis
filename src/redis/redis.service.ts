import { Inject, Injectable } from "@nestjs/common"
import { RedisClientType, RedisFunctions, RedisModules, RedisScripts, createClient } from "redis"
import { RedisModuleOptions } from "./redis.interface"

@Injectable()
export class RedisService {
  client: ReturnType<typeof createClient<RedisModules, RedisFunctions, RedisScripts>> | null
  constructor(@Inject("REDIS_OPTIONS") private readonly options: RedisModuleOptions) {
    this.client = null
    this.connect()
  }

  private connect = async () => {
    this.client = createClient(this.options)
    await this.client.connect()
  }

  hget = (...args: Parameters<RedisClientType["HGET"]>): ReturnType<RedisClientType["HGET"]> => {
    return this.client.HGET(...args)
  }

  hset = (...args: Parameters<RedisClientType["HSET"]>): ReturnType<RedisClientType["HSET"]> => {
    return this.client.HSET(...args)
  }

  hgetAll = (
    ...args: Parameters<RedisClientType["HGETALL"]>
  ): ReturnType<RedisClientType["HGETALL"]> => {
    return this.client.HGETALL(...args)
  }
}
