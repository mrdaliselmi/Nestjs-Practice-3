/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import {v4} from 'uuid';
import constants from '../constants';
// import uuid from 'uuid-random';
// const generateUUID = () => parseInt(uuid().replace(/-/g, ''), 16);
@Global()
@Module({
  providers: [{
    provide: constants.uuid,
    useValue: v4
  }],
  exports: [constants.uuid]
})
export class CommonModule {}