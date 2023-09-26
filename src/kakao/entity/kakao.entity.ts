import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Kakao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profileNickname: string;

  @Column()
  accountEmail: string;

  @Column()
  profile_image: string;
}
