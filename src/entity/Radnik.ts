import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObavestenjeOUplatama } from "./ObavestenjeOUplatama";
import { RacunSaBrutoCenom } from "./RacunSaBrutoCenom";

@Entity()
export class Radnik {

    @PrimaryGeneratedColumn()
    sifraRadnika: number;

    @Column()
    imePrezime: string;

    @OneToMany(type => ObavestenjeOUplatama, obavestenjeOUplatama => obavestenjeOUplatama.radnik)
    obavestenja: ObavestenjeOUplatama[];

    @OneToMany(type => RacunSaBrutoCenom, racun => racun.radnik)
    racuni: RacunSaBrutoCenom[];
}