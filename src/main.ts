import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'classroom',
        brokers: [process.env.KAFKA_BROKERS],
      },
    },
  });

  await app.startAllMicroservices();

  const port = process.env.PORT ?? 3334;
  await app.listen(port);
}
bootstrap();
