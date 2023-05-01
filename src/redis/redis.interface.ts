import { RedisClientOptions } from "redis"
import { ModuleMetadata } from "@nestjs/common"

export type RedisModuleOptions = RedisClientOptions

export interface IRedisModuleAsyncOptions extends Pick<ModuleMetadata, "imports"> {
  useFactory?: (...args: any[]) => Promise<RedisModuleOptions> | RedisModuleOptions
  inject?: any[]
}
