import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { First } from './first/first.module';
import { TodoModule } from './todo/todo.module';
import { CommonModule } from './common/common.module';
import { FirstController } from './first/first.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { TodoEntity } from './todo/entities/todo.entity';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity';
import { AuthenticationMiddleware } from './middlewares/auth.middleware';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { SkillEntity } from './skill/entities/skill.entity';
import { CvEntity } from './cv/entities/cv.entity';

dotenv.config();
@Module({
  imports: [First, TodoModule, CommonModule, UserModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [TodoEntity, UserEntity, SkillEntity, CvEntity],
      synchronize: true,
    }),
    CvModule,
    SkillModule,
    ],
  controllers: [
        FirstController, AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes("todo", "cv");
  }
}