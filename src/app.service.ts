import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  /**
   * Retrieves a greeting message.
   *
   * This method returns a string containing the greeting message 'Hello World!'.
   *
   * @returns {string} The greeting message.
   */
  getHello(): string {
    return 'Hello World!';
  }
}
