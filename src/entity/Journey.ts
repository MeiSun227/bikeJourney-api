import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Station } from './Station';

@Entity()
export class Journey {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    departure!: Date

    @Column({ nullable: true })
    return!: Date

    @Column({ nullable: true })
    departurestation_id!: number;

    @Column({ nullable: true })
    departurestation_name!: string;

    @Column({ nullable: true })
    returnstation_id!: number;

    @Column({ nullable: true })
    returnstation_name!: string;

    @Column("decimal",{ nullable: true })
    covereddistance!: number;

    @Column("decimal",{ nullable: true })
    duration!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne(() => Station, (station) => station.departureJourneys)
    departureStation!: Station;

    @ManyToOne(() => Station, (station) => station.returnJourneys)
    returnStation!: Station;

}