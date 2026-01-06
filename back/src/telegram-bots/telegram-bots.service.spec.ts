import { Test, TestingModule } from '@nestjs/testing';
import { TelegramBotsService } from './telegram-bots.service';

describe('TelegramBotsService', () => {
  let service: TelegramBotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelegramBotsService],
    }).compile();

    service = module.get<TelegramBotsService>(TelegramBotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
