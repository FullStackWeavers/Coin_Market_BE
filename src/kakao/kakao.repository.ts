import { EntityRepository, Repository } from 'typeorm';
import { Kakao } from './entity/kakao.entity';

@EntityRepository(Kakao)
export class KakaoRepository extends Repository<Kakao> {}
