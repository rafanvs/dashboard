import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTelegramBotDto } from './dto/create-telegram-bot.dto';
import { UpdateTelegramBotDto } from './dto/update-telegram-bot.dto';

@Injectable()
export class TelegramBotsService {
    constructor(private prisma: PrismaService) { }

    async create(userId: number, createTelegramBotDto: CreateTelegramBotDto) {
        return this.prisma.telegramBot.create({
            data: {
                ...createTelegramBotDto,
                userId,
            },
        });
    }

    async findAll(userId: number) {
        return this.prisma.telegramBot.findMany({
            where: { userId },
        });
    }

    async findOne(userId: number, id: number) {
        const bot = await this.prisma.telegramBot.findUnique({
            where: { id },
        });

        if (!bot) {
            throw new NotFoundException(`Telegram Bot with ID ${id} not found`);
        }

        if (bot.userId !== userId) {
            throw new ForbiddenException('You do not have permission to access this bot');
        }

        return bot;
    }

    async update(userId: number, id: number, updateTelegramBotDto: UpdateTelegramBotDto) {
        await this.findOne(userId, id); // Reuse ownership check

        return this.prisma.telegramBot.update({
            where: { id },
            data: updateTelegramBotDto,
        });
    }

    async remove(userId: number, id: number) {
        await this.findOne(userId, id); // Reuse ownership check

        return this.prisma.telegramBot.delete({
            where: { id },
        });
    }
}
