import { Body, Controller, Post } from '@nestjs/common';
import { userSubscribeDto } from './dto/user-subscribe.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { loginCredentialsDto } from './dto/login-credentials.dto';

@Controller('user')
export class UserController {
    constructor(private userService : UserService) {}

    @Post('register')
    async register(@Body() userData : userSubscribeDto): Promise<Partial<UserEntity>> {
        return this.userService.register(userData);
    }

    @Post('login')
    async login(@Body() credentials : loginCredentialsDto) {
        return this.userService.login(credentials);
    }
}
