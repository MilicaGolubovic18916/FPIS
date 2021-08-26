import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import { ObavestenjeOUplatama } from "../entity/ObavestenjeOUplatama";

const router = Router();

//get all
router.get("/", async (req: Request, res: Response) => {
    try {
        res.json(await getRepository(ObavestenjeOUplatama).find());
    } catch (e) {
        res.json({ error: e.message });
    }
});

//get by id
router.get("/:id", async (req: Request, res: Response) => {
    try {
        let obavestenje = await getRepository(ObavestenjeOUplatama).findOne(req.params.id);
        if (obavestenje) {
            res.json(obavestenje);
        } else {
            res.json({ error: `Obavestenje id: ${req.params.id} ne postoji.` });
        }
    } catch (e) {
        res.json({ error: e.message });
    }
});

//delete by id
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        let obavestenje = await getRepository(ObavestenjeOUplatama).findOne(req.params.id);
        if (obavestenje) {
            await getRepository(ObavestenjeOUplatama).delete(req.params.id);
            res.sendStatus(200);
        } else {
            res.json({ error: `Obavestenje id: ${req.params.id} ne postoji.` });
        }
    } catch (e) {
        res.json({ error: e.message });
    }
});

//insert one
router.post("/", async (req: Request, res: Response) => {
    try {
        let result = await getRepository(ObavestenjeOUplatama).insert({ ...req.body });
        res.json(await getRepository(ObavestenjeOUplatama).findOne(result.identifiers[0].idObavestenja));
    } catch (e) {
        res.json({ error: e.message });
    }
});

//update one
router.patch("/:id", async (req: Request, res: Response) => {
    try {
        await getRepository(ObavestenjeOUplatama).update(req.params.id, req.body);
        let obavestenje = await getRepository(ObavestenjeOUplatama).findOne(req.params.id)
        if (obavestenje) {
            res.json(obavestenje);
        } else {
            res.json({ error: `Obavestenje id ${req.params.id} ne postoji.` });
        }
    } catch (e) {
        res.json({ error: e.message });
    }
});

export default router;