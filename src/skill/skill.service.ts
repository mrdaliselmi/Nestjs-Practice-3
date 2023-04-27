import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillEntity } from './entities/skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillService {

  constructor(
    @InjectRepository(SkillEntity)
    private skillRepository: Repository<SkillEntity>
  ){}

  async create(createSkillDto: CreateSkillDto) {
    return await this.skillRepository.save(createSkillDto);
  }

  async findAll() {
    return await this.skillRepository.find();
  }

  async findOne(id: number) {
    const skill = await this.skillRepository.findOne({where : {"id" : id}});
    if(!skill) throw new NotFoundException(`todo of id ${id} not found`);
    return skill;  
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    const skill = await this.skillRepository.findOne({where : {"id" : id}});
    if(!skill) throw new NotFoundException(`todo of id ${id} not found`);
    return await this.skillRepository.update(id, updateSkillDto);
  }

  async remove(id: number) {
    const skill = await this.skillRepository.findOne({where : {"id" : id}});
    if(!skill) throw new NotFoundException(`todo of id ${id} not found`);
    return await this.skillRepository.delete(id);
  }
}
