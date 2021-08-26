import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import { StavkaRacunaSaBrutoCenom } from "../entity/StavkaRacunaSaBrutoCenom";


const router = Router();

//get all
router.get("/", async (req: Request, res: Response) => {
    try {
        let stavke = await getRepository(StavkaRacunaSaBrutoCenom).find();
        res.json(stavke);
    } catch (e) {
        res.json({ error: e.message });
    }
});

//delete by id
router.delete("/:brRacuna/:rb", async (req: Request, res: Response) => {
    try {
        let sR = Number(req.params.sifraRacuna);
        let rbS = Number(req.params.rbStavkeRacuna);
        let stavka = await getRepository(StavkaRacunaSaBrutoCenom).find({ where: { brRacuna: sR, rb: rbS } });

        if (stavka !== []) {
            await getRepository(StavkaRacunaSaBrutoCenom).delete({ brRacuna: sR, rb: rbS });
            res.sendStatus(200);
        } else {
            res.json({ error: `Stavka -> šifra računa: ${sR}, redni broj stavke: ${rbS} ne postoji.` });

        }
    } catch (e) {
        res.json({ error: e.message });
    }

});

//insert one
router.post("/", async (req: Request, res: Response) => {
    try {
        let result = await getRepository(StavkaRacunaSaBrutoCenom).insert({ ...req.body });
        let sR = result.identifiers[0].brRacuna;
        let rbS = result.identifiers[0].rb;
        let stavka = await getRepository(StavkaRacunaSaBrutoCenom).find({ where: { brRacuna: sR, rb: rbS } });
        res.json(stavka[0]);
    } catch (e) {
        res.json({ error: e.message });
    }
});

//update one
router.patch("/:brRacuna/:rb", async (req: Request, res: Response) => {
    try {
        let sR = Number(req.params.sifraRacuna);
        let rbS = Number(req.params.rbStavkeRacuna);
        await getRepository(StavkaRacunaSaBrutoCenom).update({ brRacuna: sR, rb: rbS }, req.body);
        let stavka = await getRepository(StavkaRacunaSaBrutoCenom).find({ where: { brRacuna: sR, rb: rbS } });
        if (stavka[0]) {
            res.json(stavka[0]);
        } else {
            res.json({ error: `Stavka -> šifra računa: ${sR}, redni broj stavke: ${rbS} ne postoji.` });

        }
    } catch (e) {
        res.json({ error: e.message });
    }
});

export default router;

