import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RacunSaBrutoCenom } from "./RacunSaBrutoCenom";


@Entity()
export class NacinPlacanja {

    @PrimaryGeneratedColumn()
    idNacinPlacanja: number;

    @Column()
    naziv: string;

    @OneToMany(type => RacunSaBrutoCenom, racun => racun.nacinPlacanja)
    racuni: RacunSaBrutoCenom[];
}