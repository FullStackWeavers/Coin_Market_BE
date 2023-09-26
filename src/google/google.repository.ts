import { EntityRepository, Repository } from 'typeorm';
import { Google } from './entity/google.entity';

@EntityRepository(Google)
export class GoogleRepository extends Repository<Google> {}
