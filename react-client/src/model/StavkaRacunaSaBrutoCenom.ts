export class StavkaRacunaSaBrutoCenom {

    rb: number;
    brRacuna: number;
    nazivStavke: string;
    netoCena: number;
    marza: number;
    brutoCena: number;
    status: string = 'stara';

    constructor(rb: number, brRacuna: number, nazivStavke: string, netoCena: number, marza: number, brutoCena: number) {
        this.rb = rb;
        this.brRacuna = brRacuna;
        this.nazivStavke = nazivStavke;
        this.netoCena = netoCena;
        this.marza = marza;
        this.brutoCena = brutoCena;
    }

}