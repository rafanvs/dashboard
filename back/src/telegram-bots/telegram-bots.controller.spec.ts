import { Test, TestingModule } from '@nestjs/testing';
import { TelegramBotsController } from './telegram-bots.controller';

describe('TelegramBotsController', () => {
  let controller: TelegramBotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelegramBotsController],
    }).compile();

    controller = module.get<TelegramBotsController>(TelegramBotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
