import { Radnik } from "./Radnik";

export class ObavestenjeOUplatama {

    idObavestenja: number;
    datum: string;
    svrhaObavestenja: string;
    idObavestenjaHotela: number;
    idObavestenjaPrevoza: number;
    idObavestenjaOsiguranja: number;
    jmbg: number;
    radnik: Radnik;


    constructor(idObavestenja: number, datum: string, svrhaObavestenja: string, idObavestenjaHotela: number,
        idObavestenjaPrevoza: number, idObavestenjaOsiguranja: number, jmbg: number, radnik: Radnik) {

        this.idObavestenja = idObavestenja;
        this.datum = datum;
        this.svrhaObavestenja = svrhaObavestenja;
        this.idObavestenjaHotela = idObavestenjaHotela;
        this.idObavestenjaPrevoza = idObavestenjaPrevoza;
        this.idObavestenjaOsiguranja = idObavestenjaOsiguranja;
        this.jmbg = jmbg;
        this.radnik = radnik;


    }


}