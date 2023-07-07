import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { OwnersService } from '../owners/owners.service';
import { Owner } from '../owners/entities/owner.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private readonly petsRepository: Repository<Pet>,
    private readonly ownersService: OwnersService,
  ) {}

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find();
  }

  async findOnePet(id: number) {
    return await this.petsRepository.findOneBy({ id: id });
  }

  async createPet(createPetDto: CreatePetDto): Promise<Pet | string> {
    const newPet = this.petsRepository.create(createPetDto);

    return await this.petsRepository.save(newPet);
  }

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownersService.findOne(ownerId);
  }
}
