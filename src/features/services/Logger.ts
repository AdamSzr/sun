import { formatDate } from '@/utils/utils';
import React from 'react';

export class Logger{

  constructor() {}

  log(text: string){
    console.log(text);
  }
}


export const logger = new Logger();

export const log = (text:string) => logger.log(`[${formatDate('DD.MM.YYYY hh:mm:ss')}]` + text);

export default Logger;