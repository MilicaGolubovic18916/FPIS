import { NacinPlacanja } from "./NacinPlacanja";
import { Radnik } from "./Radnik";
import { StavkaRacunaSaBrutoCenom } from "./StavkaRacunaSaBrutoCenom";

export class RacunSaBrutoCenom {

    brRacuna: number;
    rokPlacanja: string;
    datumIzdavanja: string;
    osnova: string;
    ukupnaBrutoCena: number;
    // idMestoIzdavanja: number;
    jmbg: number;
    nacinPlacanja: NacinPlacanja;
    // brRacunaOsiguranja: number;
    radnik: Radnik;
    // brFakture: number;
    // brProfakture: number;
    stavkeRacuna: StavkaRacunaSaBrutoCenom[];

    constructor(brRacuna: number, rokPlacanja: string, datumIzdavanja: string, osnova: string, ukupnaBrutoCena: number,
        jmbg: number, radnik: Radnik, nacinPlacanja: NacinPlacanja, stavkeRacuna: StavkaRacunaSaBrutoCenom[]) {

        this.brRacuna = brRacuna;
        this.rokPlacanja = rokPlacanja;
        this.datumIzdavanja = datumIzdavanja;
        this.osnova = osnova;
        this.ukupnaBrutoCena = ukupnaBrutoCena;
        this.jmbg = jmbg;
        this.nacinPlacanja = nacinPlacanja;
        this.radnik = radnik;
        this.stavkeRacuna = stavkeRacuna;


    }
}