import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  isCompleted: boolean;
}
