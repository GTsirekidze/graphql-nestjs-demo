import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { Owner } from '../owners/entities/owner.entity';

@Resolver((of) => Pet)
export class PetsResolver {
  constructor(private readonly petsService: PetsService) {}

  @Query((returns) => [Pet])
  pets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @Mutation((returns) => Pet)
  async createPet(
    @Args('createPetDto') createPetDto: CreatePetDto,
  ): Promise<Pet | string> {
    return await this.petsService.createPet(createPetDto);
  }

  @Query((returns) => Pet)
  async getPet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return await this.petsService.findOnePet(id);
  }

  @ResolveField((returns) => Owner)
  owner(@Parent() pet: Pet): Promise<Owner> {
    return this.petsService.getOwner(pet.ownerId);
  }
}
