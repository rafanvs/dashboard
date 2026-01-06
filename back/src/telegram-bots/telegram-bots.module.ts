import { Module } from '@nestjs/common';
import { TelegramBotsService } from './telegram-bots.service';
import { TelegramBotsController } from './telegram-bots.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TelegramBotsController],
  providers: [TelegramBotsService],
})
export class TelegramBotsModule { }
