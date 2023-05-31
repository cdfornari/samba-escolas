import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EscolasService } from './escolas.service';
import { Escola } from './entities/escola.entity';
import { CreateEscolaInput } from './dto/create-escola.input';
import { UpdateEscolaInput } from './dto/update-escola.input';

@Resolver(() => Escola)
export class EscolasResolver {
  constructor(private readonly escolasService: EscolasService) {}

  @Mutation(() => Escola)
  createEscola(@Args('createEscolaInput') createEscolaInput: CreateEscolaInput) {
    return this.escolasService.create(createEscolaInput);
  }

  @Query(() => [Escola], { name: 'escolas' })
  findAll() {
    return this.escolasService.findAll();
  }

  @Query(() => Escola, { name: 'escola' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.escolasService.findOne(id);
  }

  @Mutation(() => Escola)
  updateEscola(@Args('updateEscolaInput') updateEscolaInput: UpdateEscolaInput) {
    return this.escolasService.update(updateEscolaInput.id, updateEscolaInput);
  }

  @Mutation(() => Escola)
  removeEscola(@Args('id', { type: () => Int }) id: number) {
    return this.escolasService.remove(id);
  }
}
