import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { Journey } from "./Journey";

@Entity()
export class Station {
  @Column({ nullable: true })
  FID!: number;

  @PrimaryColumn()
  id!: number;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  address!: string;

  @Column({ nullable: true })
  city!: string;

  @Column({ nullable: true })
  operator!: string;

  @Column({ nullable: true })
  capacities!: number;

  @Column("decimal", { nullable: true })
  x!: number;

  @Column("decimal", { nullable: true })
  y!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Journey, (journey) => journey.departureStation)
  departureJourneys!: Journey[];

  @OneToMany(() => Journey, (journey) => journey.returnStation)
  returnJourneys!: Journey[];
}
