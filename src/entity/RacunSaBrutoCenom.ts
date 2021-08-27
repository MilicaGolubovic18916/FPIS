import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NacinPlacanja } from "./NacinPlacanja";
import { Radnik } from "./Radnik";
import { StavkaRacunaSaBrutoCenom } from "./StavkaRacunaSaBrutoCenom";

@Entity()
export class RacunSaBrutoCenom {

    @PrimaryGeneratedColumn()
    brRacuna: number;

    @Column()
    rokPlacanja: Date;

    @Column()
    datumIzdavanja: Date;

    @Column()
    osnova: string;

    @Column()
    ukupnaBrutoCena: number;

    @Column()
    jmbg: number;

    @ManyToOne(type => Radnik, radnik => radnik.racuni, { eager: true })
    radnik: Radnik;

    @OneToMany(type => StavkaRacunaSaBrutoCenom, stavkaRacuna => stavkaRacuna.racun, { eager: true })
    stavkeRacuna: StavkaRacunaSaBrutoCenom[];

    @ManyToOne(type => NacinPlacanja, nacinPlacanja => nacinPlacanja.racuni, { eager: true })
    nacinPlacanja: NacinPlacanja;


}