import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class KakaoUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profileNickname: string;

  @Column()
  accountEmail: string;

  @Column()
  profile_image: string;
}
