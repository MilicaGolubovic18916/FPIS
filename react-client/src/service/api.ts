import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";
import { ObavestenjeOUplatama } from "../model/ObavestenjeOUplatama";
import { RacunSaBrutoCenom } from "../model/RacunSaBrutoCenom";

const baseURL = "http://localhost:3001";

export async function getAllObavestenjaOUplatama() {

    let res = await fetch(baseURL + "/obavestenjeOUplatama");
    let obavestenja = await res.json();
    return obavestenja.map((obav: any) => ({ ...obav }));
}

export async function getAllRadnici() {
    let res = await fetch(baseURL + "/radnik");
    return await res.json();
}

export async function addObavestenjeOUplatama(obavestenjaOSvimIzvrsenimUplatama: ObavestenjeOUplatama) {
    let { idObavestenja, ...obav } = obavestenjaOSvimIzvrsenimUplatama;
    let res = await fetch(baseURL + "/obavestenjeOUplatama", {
        method: 'POST',
        body: JSON.stringify(obav),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    return await res.json();
}

export async function removeObavestenjeOUplatama(idObavestenja: number) {
    await fetch(baseURL + `/obavestenjeOUplatama/${idObavestenja}`, {
        method: 'DELETE'
    });
}

export async function updateObavestenjeOUplatama(obavestenjeOUplatama: ObavestenjeOUplatama) {
    let { idObavestenja, ...obav } = obavestenjeOUplatama;
    let res = await fetch(baseURL + `/obavestenjeOUplatama/${idObavestenja}`, {
        method: 'PATCH',
        body: JSON.stringify(obav),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await res.json();
}

export async function getAllNacinPlacanja() {
    let res = await fetch(baseURL + "/nacinPlacanja");
    return await res.json();
}

export async function getAllRacune() {
    let res = await fetch(baseURL + "/racun");
    let racuni = await res.json();
    let r = racuni.map((rac: any) => ({ ...rac }));

    for (let i = 0; i < r.length; i++) {
        for (let j = 0; j < r[i].stavkeRacuna.length; j++) {
            r[i].stavkeRacuna[j].status = "Stara";
        }
    }
    return r;
}

export async function addRacun(racun: RacunSaBrutoCenom) {
    let { brRacuna, ...rac } = racun;
    let result = await fetch(baseURL + "/racun", {
        method: 'POST',
        body: JSON.stringify(rac),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await result.json();
}

export async function updateRacun(racun: RacunSaBrutoCenom) {
    let { brRacuna, ...rac } = racun;
    let res = await fetch(baseURL + `/racun/${brRacuna}`, {
        method: 'PATCH',
        body: JSON.stringify(rac),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await res.json();
}

export async function removeRacun(brRacuna: number) {
    await fetch(baseURL + `/racun/${brRacuna}`, {
        method: 'DELETE'
    });
}