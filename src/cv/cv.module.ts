import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { CvEntity } from './entities/cv.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillEntity } from '../skill/entities/skill.entity';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CvEntity, SkillEntity, UserEntity])],
  controllers: [CvController],
  providers: [CvService]
})
export class CvModule {}
