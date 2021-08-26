import { createConnection } from "typeorm";
import express = require("express");
import cors = require("cors");
import * as bodyParser from "body-parser";
import RadnikRoutes from "./routes/RadnikRoutes";
import ObavestenjeOUplatamaRoutes from "./routes/ObavestenjeOUplatamaRoutes";
import RacunSaBrutoCenomRoutes from "./routes/RacunSaBrutoCenomRoutes";
import StavkaRacunaSaBrutoCenomRoutes from "./routes/StavkaRacunaSaBrutoCenomRoutes";
import NacinPlacanjaRoutes from "./routes/NacinPlacanja";


createConnection().then(connection => {

    //create express app
    const app = express();
    //set middlewares
    app.use(bodyParser.json());
    app.use(cors());

    //add routes
    app.use("/radnik", RadnikRoutes);
    app.use("/obavestenjeOUplatama", ObavestenjeOUplatamaRoutes);
    app.use("/racun", RacunSaBrutoCenomRoutes);
    app.use("/stavkaRacuna", StavkaRacunaSaBrutoCenomRoutes);
    app.use("/nacinPlacanja", NacinPlacanjaRoutes);


    // start express server
    app.listen(3001, () => console.log("Listening on 3001..."));

}).catch(error => console.log(error));



