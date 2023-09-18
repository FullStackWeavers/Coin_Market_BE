import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true }) // 1 패스워드에 빈 값 허용
  password: string;

  @Column()
  username: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdDt: Date;

  @Column({ nullable: true }) // 2 providerId에 빈 값 허용
  providerId: string; // 3 providerId 추가
}
