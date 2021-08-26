import { type } from "os";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Radnik } from "./Radnik";

@Entity()
export class ObavestenjeOUplatama {

    @PrimaryGeneratedColumn()
    idObavestenja: number;

    @Column()
    datum: Date;

    @Column()
    svrhaObavestenja: string;

    @Column()
    idObavestenjaHotela: number;

    @Column()
    idObavestenjaPrevoza: number;

    @Column()
    idObavestenjaOsiguranja: number;

    @Column()
    jmbg: number;

    @ManyToOne(type => Radnik, radnik => radnik.obavestenja, { eager: true })
    radnik: Radnik;

}