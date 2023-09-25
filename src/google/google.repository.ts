import { EntityRepository, Repository } from 'typeorm';
import { GoogleUser } from './entity/google.entity';

@EntityRepository(GoogleUser)
export class GoogleRepository extends Repository<GoogleUser> {}
