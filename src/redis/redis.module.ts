import { Module, DynamicModule, Global } from "@nestjs/common"
import { IRedisModuleAsyncOptions, RedisModuleOptions } from "./redis.interface"
import { RedisService } from "./redis.service"

@Global()
@Module({})
export class RedisModule {
  public static forRoot(options: RedisModuleOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          // options de redis
          provide: "REDIS_OPTIONS",
          useValue: options,
        },
        RedisService,
      ],
      exports: [RedisService],
    }
  }
  public static forRootAsync(options: IRedisModuleAsyncOptions): DynamicModule {
    return {
      module: RedisModule,
      imports: options.imports || [],
      providers: [
        {
          provide: "REDIS_OPTIONS",
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        RedisService,
      ],
      exports: [RedisService],
    }
  }
}
