import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Controller('skill')
export class SkillController {

  constructor(
    private readonly skillService: SkillService) {
    }

  @Post()
  async create(@Body() createSkillDto: CreateSkillDto) {
    return await this.skillService.create(createSkillDto);
  }

  @Get()
  async findAll() {
    return await this.skillService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.skillService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return await this.skillService.update(+id, updateSkillDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.skillService.remove(+id);
  }
}
