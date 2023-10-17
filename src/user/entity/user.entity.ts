import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  photo: string;

  @Column({ nullable: true })
  connectKey?: string;

  @Column({ nullable: true })
  secretKey?: string;
}
