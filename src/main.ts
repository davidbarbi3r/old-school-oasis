import { NestFactory } from "@nestjs/core"
import { Logger } from "@nestjs/common"
import { AppModule } from "./app.module"
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify"

async function bootstrap() {
  const port = process.env.PORT || 3000

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  app.enableCors()
  await app.listen(port)
  Logger.log(`Server running on ${await app.getUrl()})`, "Bootstrap")
}
bootstrap()
