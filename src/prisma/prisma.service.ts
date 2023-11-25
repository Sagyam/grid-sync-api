import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
      .then(() => {
        console.log('Database connected');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async onModuleDestroy() {
    await this.$disconnect()
      .then(() => {
        console.log('Database disconnected');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
