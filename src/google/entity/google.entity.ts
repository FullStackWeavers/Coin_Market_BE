import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Google extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  email: string;

  @Column()
  photo: string;
}
