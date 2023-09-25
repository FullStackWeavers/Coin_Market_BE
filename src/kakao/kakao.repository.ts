import { EntityRepository, Repository } from 'typeorm';
import { KakaoUser } from './entity/kakao.entity';

@EntityRepository(KakaoUser)
export class KakaoRepository extends Repository<KakaoUser> {}
