import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  //testing purpose
  // const eventGateway = app.get(EventsGateway);
  // setInterval(()=>eventGateway.sendMessage(),1000);
}
bootstrap();
