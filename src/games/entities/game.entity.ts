import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('varchar', { array: true })
  platforms: string[];

  @Column()
  company: string;

  // string array of genres
  @Column('varchar', { array: true })
  genres: string[];

  @Column()
  release_date: Date;

  @Column()
  rating: number;

  @Column()
  cover: string;
}
