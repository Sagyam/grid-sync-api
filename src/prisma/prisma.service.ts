import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * This method is part of the lifecycle of a NestJS module.
   * It's called when the module is initialized.
   *
   * It attempts to establish a connection to the database using the Prisma client.
   * If the connection is successful, it logs a message to the console indicating that the database is connected.
   * If the connection fails, it catches the error and logs it to the console.
   *
   * @async
   * @returns {Promise<void>} Nothing. But it's asynchronous, so it returns a Promise that resolves to undefined.
   */
  async onModuleInit() {
    await this.$connect()
      .then(() => {
        console.log('Database connected');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * This method is part of the lifecycle of a NestJS module.
   * It's called when the module is initialized.
   *
   * It attempts to establish a connection to the database using the Prisma client.
   * If the connection is successful, it logs a message to the console indicating that the database is connected.
   * If the connection fails, it catches the error and logs it to the console.
   *
   * @async
   * @returns {Promise<void>} Nothing. But it's asynchronous, so it returns a Promise that resolves to undefined.
   */

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
