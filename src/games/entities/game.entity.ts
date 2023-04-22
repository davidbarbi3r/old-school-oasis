import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('character', { array: true })
  platforms: string[];

  @Column()
  company: string;

  // string array of genres
  @Column('character', { array: true })
  genres: string[];

  @Column()
  release_date: string;

  @Column()
  rating: number;

  @Column()
  cover: string;
}
