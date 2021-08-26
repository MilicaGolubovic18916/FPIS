import { Router, Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { Radnik } from "../../react-client/src/model/Radnik";
import { RacunSaBrutoCenom } from "../entity/RacunSaBrutoCenom";
import { StavkaRacunaSaBrutoCenom } from "../entity/StavkaRacunaSaBrutoCenom";

const router = Router();
const baseURL = "http://localhost:3001";

//get all
router.get("/", async (req: Request, res: Response) => {
    try {
        let racuni = await getRepository(RacunSaBrutoCenom).find();
        res.json(racuni);
    } catch (e) {
        res.json({ error: e.message });
    }
});

//get by id
router.get("/:id", async (req: Request, res: Response) => {
    try {
        let racun = await getRepository(RacunSaBrutoCenom).findOne(req.params.id);
        if (racun) {
            res.json(racun);
        } else {
            res.json({ error: `Račun -> id ${req.params.id} ne postoji.` });
        }
    } catch (e) {
        res.json({ error: e.message });
    }
});

//update one
router.patch("/:id", async (req: Request, res: Response) => {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    //lets now open a new transaction
    await queryRunner.startTransaction();
    try {

        let brRacuna = req.params.id;
        let rokPlacanja = req.body.rokPlacanja;
        let datumIzdavanja = req.body.datumIzdavanja;
        let ukupnaBrutoCena = req.body.ukupnaBrutoCena;
        let osnova = req.body.osnova;
        let jmbg = req.body.jmbg;
        let nacinPlacanja = req.body.nacinPlacanja;
        let radnikO = req.body.radnik;
        let stavkeRacuna = req.body.stavkeRacuna;
        await queryRunner.manager.update(RacunSaBrutoCenom, brRacuna,
            {
                'rokPlacanja': rokPlacanja, 'datumIzdavanja': datumIzdavanja, 'ukupnaBrutoCena': ukupnaBrutoCena, 'osnova': osnova, 'jmbg': jmbg,
                'nacinPlacanja': nacinPlacanja,
                'radnik': radnikO
            });
        for (let stavka of stavkeRacuna) {
            let { status, ...s } = stavka;
            if (status === "Nova") {
                try {
                    await queryRunner.manager.insert(StavkaRacunaSaBrutoCenom, { ...s });
                } catch (e) {
                    throw e;
                }
            }
            if (status === "Izmenjena") {
                try {
                    let { rb, brRacuna, ...ostatak } = s;
                    let sR = Number(brRacuna);
                    let rbS = Number(rb);
                    await queryRunner.manager.update(StavkaRacunaSaBrutoCenom, { brRacuna: sR, rb: rbS }, ostatak);
                } catch (e) {
                    throw (e);
                }
            }
            if (status === "Obrisana") {
                try {
                    let { rb, brRacuna } = s;
                    let sR = Number(brRacuna);
                    let rbS = Number(rb);
                    let stavka = await queryRunner.manager.find(StavkaRacunaSaBrutoCenom, { where: { brRacuna: sR, rb: rbS } });

                    if (stavka !== []) {
                        await queryRunner.manager.delete(StavkaRacunaSaBrutoCenom, { brRacuna: sR, rb: rbS });
                    } else {
                        res.json({ error: `Stavka računa -> broj računa ${sR} i redni broj stavke ${rbS} ne postoji.` });
                    }
                } catch (e) {
                    throw e;
                }
            }
        }
        let racun = await queryRunner.manager.findOne(RacunSaBrutoCenom, req.params.id);
        if (racun) {
            await queryRunner.commitTransaction();
            res.json(racun);
        } else {
            res.json({ error: `Račun -> id: ${req.params.id} ne postoji.` });
        }
    } catch (err) {
        res.json({ error: `Došlo je do greške. ${err}` });
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }
});

//delete by id
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        let racun = await getRepository(RacunSaBrutoCenom).findOne(req.params.id);
        if (racun) {
            await getRepository(RacunSaBrutoCenom).delete(req.params.id);
            res.sendStatus(200);
        } else {
            res.json({ error: `Račun -> id ${req.params.id} ne postoji.` });
        }
    } catch (e) {
        res.json({ error: e.message });
    }
});

//insert one
router.post("/", async (req: Request, res: Response) => {
    console.log("ok");
    console.log(req.body);
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    // lets now open a new transaction:
    await queryRunner.startTransaction();
    try {

        let datumIzdavanja = req.body.datumIzdavanja;
        let rokPlacanja = req.body.rokPlacanja;
        let ukupnaBrutoCena = req.body.ukupnaBrutoCena;
        let osnova = req.body.osnova;
        let jmbg = req.body.jmbg;
        let nacinPlacanja = req.body.nacinPlacanja;
        let radnikO = req.body.radnik;
        let result = await queryRunner.manager.insert(RacunSaBrutoCenom, { 'rokPlacanja': rokPlacanja, 'datumIzdavanja': datumIzdavanja, 'osnova': osnova, 'ukupnaBrutoCena': ukupnaBrutoCena, 'jmbg': jmbg, 'radnik': radnikO, 'nacinPlacanja': nacinPlacanja });
        let brRacuna = result.identifiers[0].brRacuna;
        let stavkeRacuna = req.body.stavkeRacuna;
        for (let stavka of stavkeRacuna) {
            stavka.brRacuna = brRacuna;
            let { status, ...s } = stavka;
            try {
                await queryRunner.manager.insert(StavkaRacunaSaBrutoCenom, { ...s });
            } catch (e) {
                throw e;
            }
        }
        let racun = await queryRunner.manager.findOne(RacunSaBrutoCenom, result.identifiers[0].brRacuna);
        if (racun) {
            await queryRunner.commitTransaction();
            res.json(racun);
        } else {
            res.json({ error: `Racun -> id ${brRacuna} ne postoji.` });
        }
    } catch (err) {
        res.json({ error: `Došlo je do greske. ${err} ` });
        console.log(err);
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }
});

export default router;