import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
    ParseIntPipe,
} from '@nestjs/common';
import { TelegramBotsService } from './telegram-bots.service';
import { CreateTelegramBotDto } from './dto/create-telegram-bot.dto';
import { UpdateTelegramBotDto } from './dto/update-telegram-bot.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('telegram-bots')
@UseGuards(JwtAuthGuard)
export class TelegramBotsController {
    constructor(private readonly telegramBotsService: TelegramBotsService) { }

    @Post()
    create(@Request() req, @Body() createTelegramBotDto: CreateTelegramBotDto) {
        return this.telegramBotsService.create(req.user.userId, createTelegramBotDto);
    }

    @Get()
    findAll(@Request() req) {
        return this.telegramBotsService.findAll(req.user.userId);
    }

    @Get(':id')
    findOne(@Request() req, @Param('id', ParseIntPipe) id: number) {
        return this.telegramBotsService.findOne(req.user.userId, id);
    }

    @Patch(':id')
    update(
        @Request() req,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTelegramBotDto: UpdateTelegramBotDto,
    ) {
        return this.telegramBotsService.update(req.user.userId, id, updateTelegramBotDto);
    }

    @Delete(':id')
    remove(@Request() req, @Param('id', ParseIntPipe) id: number) {
        return this.telegramBotsService.remove(req.user.userId, id);
    }
}
