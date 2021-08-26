import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { RacunSaBrutoCenom } from "./RacunSaBrutoCenom";

@Entity()
export class StavkaRacunaSaBrutoCenom {

    @PrimaryColumn()
    rb: number;

    @PrimaryColumn()
    brRacuna: number;

    @Column()
    nazivStavke: string;

    @Column()
    netoCena: number;

    @Column()
    marza: number;

    @Column()
    brutoCena: number;

    @ManyToOne(type => RacunSaBrutoCenom, racun => racun.stavkeRacuna, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'brRacuna', referencedColumnName: 'brRacuna' })
    racun: RacunSaBrutoCenom;
}