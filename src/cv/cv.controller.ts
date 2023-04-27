import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { UserRole } from '../common/user-role.enum';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  async create(
      @Body() createCvDto: CreateCvDto,
      @Req() req
      ) {
    return await this.cvService.create(createCvDto, req.user);
  }

  @Get()
  async findAll(
    @Req() req
  ) {
    const user = req['user'];
        if(user.role === UserRole.ADMIN)
        {
          return await this.cvService.findAll();
        }else{
          return await this.cvService.getAllCvsByUserId(user.id);
        }
  }

  @Get(':id')
  async findOne(
      @Param('id') id: string,
      @Req() req
      ) {
        const user = req['user'];
        if(user.role === UserRole.ADMIN)
        {
          return await this.cvService.findOne(+id);
        }else{
          return await this.cvService.getAllCvsByUserIdByid(+id,user.id);
        }
  }

  @Patch(':id')
  async update(
      @Param('id') id: string, 
      @Body() updateCvDto: UpdateCvDto,
      @Req() req
      ) {
    return await this.cvService.update(+id, updateCvDto, req.user.id);
  }

  @Delete(':id')
  async remove(
      @Param('id') id: string,
      @Req() req
      ) {
    return await this.cvService.remove(+id, req.user.id);
  }
}
