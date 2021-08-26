import { useState, useEffect } from 'react';
import Header from '../components/Header';
import RacunSaBrutoCenomTabela from '../components/RacunSaBrutoCenomTabela';
import RacunSaBrutoCenomForma from '../components/RacunSaBrutoCenomForma';
import { RacunSaBrutoCenom } from '../model/RacunSaBrutoCenom';
import { Radnik } from '../model/Radnik';
import { StavkaRacunaSaBrutoCenom } from '../model/StavkaRacunaSaBrutoCenom';
import { addRacun, getAllNacinPlacanja, getAllRacune, getAllRadnici, removeRacun, updateRacun } from '../service/api';
import './App.css';
import Alert from 'react-popup-alert'
import StavkeTabela from '../components/StavkaRacunaSaBrutoCenomTabela';
import StavkeForma from '../components/StavkaRacunaSaBrutoCenomForma';
import { NacinPlacanja } from '../model/NacinPlacanja';


function RacunSaBrutoCenomApp() {

    let [racuni, setRacuni] = useState<RacunSaBrutoCenom[]>([]);
    let [racun, setRacun] = useState<RacunSaBrutoCenom | null>(null);
    let [radnici, setRadnici] = useState([]);
    let [naciniPlacanja, setNaciniPlacanja] = useState([]);
    let [stavkeObrisane, setStavkeObrisane] = useState<StavkaRacunaSaBrutoCenom[]>([]);
    let [selectedRowRac, setSelectedRowRac] = useState<number | null>(null);
    let [selectedRowStavka, setSelectedRowStavka] = useState<number | null>(null);
    let [error, setError] = useState('');
    let [alert, setAlert] = useState({
        type: 'error',
        text: 'This is a alert message',
        show: false
    });

    function onCloseAlert() {
        setAlert({
            type: '',
            text: '',
            show: false
        })
    }

    function onShowAlert(type: any, text: string) {
        setAlert({
            type: type,
            text: text,
            show: true
        })
    }

    const getRacuni = async () => {
        try {
            setRacuni(await getAllRacune());
        } catch (e) {
            console.log(e);
        }
    }

    const getRadnici = async () => {
        try {
            setRadnici(await getAllRadnici());
        } catch (e) {
            console.log(e);
        }
    }

    const getNaciniPlacanja = async () => {
        try {
            setNaciniPlacanja(await getAllNacinPlacanja());
        } catch (e) {
            console.log(e);
        }
    }

    const dateToYMD = (date: Date) => {
        var d = date.getDate();
        var m = date.getMonth() + 1; //Month from 0 to 11
        var y = date.getFullYear();
        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }

    useEffect(() => {
        if (racuni.length === 0) {
            (async function () {
                await getRadnici();
                await getNaciniPlacanja();
                await getRacuni();
            })();
        }
        if (selectedRowRac !== null) {
            setRacun(racuni.find((rac: RacunSaBrutoCenom) => rac.brRacuna === selectedRowRac)!);
            setSelectedRowStavka(null);
        } else {
            setRacun(new RacunSaBrutoCenom(0, dateToYMD(new Date()), dateToYMD(new Date()), '', 0, 0, new Radnik(0, ''), new NacinPlacanja(0, ''), []));
            setStavkeObrisane([]);
            setSelectedRowStavka(null);
        }
    }, [selectedRowRac]);

    const onPromeniRadnika = async (radnik: Radnik) => {
        if (racun !== null) {
            let rac = new RacunSaBrutoCenom(racun!.brRacuna,
                racun!.rokPlacanja,
                racun!.datumIzdavanja,
                racun!.osnova,
                racun!.ukupnaBrutoCena,
                racun!.jmbg,
                radnik,
                racun!.nacinPlacanja,
                racun!.stavkeRacuna);
            setRacun(rac);
        }

    }
    const onPromeniDatumIzdavanja = async (datum: string) => {
        if (racun !== null) {
            let rac = new RacunSaBrutoCenom(racun!.brRacuna,
                racun!.rokPlacanja,
                datum,
                racun!.osnova,
                racun!.ukupnaBrutoCena,
                racun!.jmbg,
                racun!.radnik,
                racun!.nacinPlacanja,
                racun!.stavkeRacuna);
            setRacun(rac);
        }
    }
    const onPromeniRokPlacanja = async (datum: string) => {
        if (racun !== null) {
            let rac = new RacunSaBrutoCenom(racun!.brRacuna,
                datum,
                racun!.datumIzdavanja,
                racun!.osnova,
                racun!.ukupnaBrutoCena,
                racun!.jmbg,
                racun!.radnik,
                racun!.nacinPlacanja,
                racun!.stavkeRacuna);
            setRacun(rac);
        }
    }

    const onPromeniNacinPlacanja = async (nacin: NacinPlacanja) => {
        if (racun !== null) {
            let rac = new RacunSaBrutoCenom(racun!.brRacuna,
                racun!.rokPlacanja,
                racun!.datumIzdavanja,
                racun!.osnova,
                racun!.ukupnaBrutoCena,
                racun!.jmbg,
                racun!.radnik,
                nacin,
                racun!.stavkeRacuna);
            setRacun(rac);
        }
    }
    const onPromeniOsnova = async (osnova: string) => {
        if (racun !== null) {
            let rac = new RacunSaBrutoCenom(racun!.brRacuna,
                racun!.rokPlacanja,
                racun!.datumIzdavanja,
                osnova,
                racun!.ukupnaBrutoCena,
                racun!.jmbg,
                racun!.radnik,
                racun!.nacinPlacanja,
                racun!.stavkeRacuna);
            setRacun(rac);
        }
    }
    const onPromeniJMBG = async (jmbg: number) => {
        if (racun !== null) {
            let rac = new RacunSaBrutoCenom(racun!.brRacuna,
                racun!.rokPlacanja,
                racun!.datumIzdavanja,
                racun!.osnova,
                racun!.ukupnaBrutoCena,
                jmbg,
                racun!.radnik,
                racun!.nacinPlacanja,
                racun!.stavkeRacuna);
            setRacun(rac);
        }
    }

    const onAddStavka = async (stavka: StavkaRacunaSaBrutoCenom) => {
        let stavkeRac = [...racun!.stavkeRacuna, { ...stavka, status: "Nova" }];
        let ukupnaBruto = stavkeRac.reduce((total, stavka) => total + stavka.brutoCena, 0);
        let rac = new RacunSaBrutoCenom(racun!.brRacuna, racun!.rokPlacanja, racun!.datumIzdavanja, racun!.osnova, ukupnaBruto, racun!.jmbg,
            racun!.radnik, racun!.nacinPlacanja, stavkeRac);
        setRacun(rac);
    }

    const onUpdateStavka = async (stavka: StavkaRacunaSaBrutoCenom) => {

        let stavkeRacuna = racun!.stavkeRacuna

        stavkeRacuna.forEach((stavkaRacuna, i) => {
            if (stavkaRacuna.rb === stavka.rb) {
                stavkeRacuna[i] = { ...stavka, status: "Izmenjena" }
            }
        })


        let ukupnaBruto = stavkeRacuna.reduce((total, stavka) => total + stavka.brutoCena, 0);
        let rac = new RacunSaBrutoCenom(racun!.brRacuna, racun!.rokPlacanja, racun!.datumIzdavanja, racun!.osnova, ukupnaBruto, racun!.jmbg,
            racun!.radnik, racun!.nacinPlacanja, stavkeRacuna);
        setRacun(rac);
    }

    const onRemoveStavka = async () => {
        const stavkaID = selectedRowStavka!;
        let stavkeRac = racun!.stavkeRacuna
        stavkeRac.forEach((s, i) => {
            if (s.rb === stavkaID) {
                stavkeRac[i] = { ...s, status: "Obrisana" }
            }
        })
        let ukupnaBruto = stavkeRac.reduce((total, stavka) => {
            if (stavka.status !== "Obrisana") {
                return total + stavka.brutoCena
            } else {
                return total
            }
        }, 0);
        let rac = new RacunSaBrutoCenom(racun!.brRacuna, racun!.rokPlacanja, racun!.datumIzdavanja, racun!.osnova, ukupnaBruto, racun!.jmbg,
            racun!.radnik, racun!.nacinPlacanja, stavkeRac);

        setRacun(rac);
        setSelectedRowStavka(null);

    }

    const onAdd = async () => {
        if (racun!.stavkeRacuna.length === 0) {
            onShowAlert('error', 'Unesite bar jednu stavku.')
            return;
        }
        try {
            let res = await addRacun(racun!);
            if (res.error) {
                setError(res.err);
                onShowAlert('error', res.error);
            } else {
                setRacuni([...racuni, { ...res }]);
                setRacun(res);
                setSelectedRowRac(res.brRacuna);
            }

        } catch (e) {
            setError("Network error" + e.message);
            onShowAlert('error', e.message);
        }
    }

    const onUpdate = async () => {

        let brObrisanih = 0;
        racun!.stavkeRacuna.forEach((stavka) => {
            if (stavka.status === "Obrisana") {
                brObrisanih++
            }
        })
        let brDodatih = 0
        racun!.stavkeRacuna.forEach((stavka) => {
            if (stavka.status === "Nova") {
                brDodatih++
            }
        })
        if (racun!.stavkeRacuna.length - brObrisanih + brDodatih === 0) {
            onShowAlert('warning', `Racun ${racun!.brRacuna} nema stavki, pa je izbrisan.`)
            onRemove()
            return
        }

        try {
            //racun!.stavkeRacuna = [...stavkeObrisane, ...racun!.stavkeRacuna];

            let res = await updateRacun(racun!);
            if (res.error) {
                setError(res.error);
                onShowAlert('error', res.error);

            } else {
                let r = await getAllRacune();
                setRacuni(r);
                onShowAlert('success', 'Uspešno ste izmenili račun!');
            }
        } catch (e) {
            setError("Network error");
            onShowAlert('error', e.message);
        }
    }

    const onRemove = async () => {
        try {
            const brRacuna = selectedRowRac!;
            await removeRacun(brRacuna);
            setRacuni(racuni.filter((rac: RacunSaBrutoCenom) => rac.brRacuna !== brRacuna));
            setSelectedRowRac(null);
        } catch (e) {
            setError("Network error");
            onShowAlert('error', e.message);
        }
    }

    return (
        <>
            <Header />
            <div className="container">
                <h1 className="display-4">Računi</h1>
                <div className="row">
                    {/* {error && <h1>{error}</h1>} */}
                    <RacunSaBrutoCenomTabela
                        racuni={racuni}
                        radnici={radnici}
                        nacini={naciniPlacanja}
                        selectedRow={selectedRowRac}
                        setSelectedRow={(id) => setSelectedRowRac(id)}
                    />
                </div>
                <div className='okvir'>
                    <div>
                        <Alert
                            header={'Obaveštenje'}
                            btnText={'Zatvori obaveštenje'}
                            text={alert.text}
                            type={alert.type}
                            show={alert.show}
                            onClosePress={onCloseAlert}
                            pressCloseOnOutsideClick={true}
                            showBorderBottom={true}
                            alertStyles={{}}
                            headerStyles={{}}
                            textStyles={{}}
                            buttonStyles={{}}
                        />
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-8">
                            <RacunSaBrutoCenomForma
                                racun={racun}
                                radnici={radnici}
                                naciniPlacanja={naciniPlacanja}
                                onPromeniRadnika={onPromeniRadnika}
                                onPromeniDatumIzdavanja={onPromeniDatumIzdavanja}
                                onPromeniRokPlacanja={onPromeniRokPlacanja}
                                onPromeniNacinPlacanja={onPromeniNacinPlacanja}
                                onPromeniOsnova={onPromeniOsnova}
                                onPromeniJMBG={onPromeniJMBG}

                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 offset-md-1">
                            <h4>Stavke računa: {racun?.brRacuna}</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col'>
                            <StavkeTabela
                                racun={racun!}
                                selectedRow={selectedRowStavka}
                                setSelectedRow={(id) => setSelectedRowStavka(id)}
                            />
                        </div>
                        <div className='col'>
                            <StavkeForma
                                racun={racun}
                                selectedRow={selectedRowStavka}
                                onAdd={onAddStavka}
                                onUpdate={onUpdateStavka}
                                onRemove={onRemoveStavka}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-4">
                        <button id="btn-add" className="btn btn-primary" disabled={selectedRowRac !== null} onClick={onAdd}><i className="fa fa-plus"></i> Sačuvaj račun</button>
                    </div>
                    <div className="col-md-4">
                        <button id="btn-update" className="btn btn-success " disabled={selectedRowRac === null} onClick={onUpdate}><i className="fa fa-pencil"></i> Izmeni račun</button>
                    </div>
                    <div className="col-md-4">
                        <button id="btn-delete" className="btn btn-danger" disabled={selectedRowRac === null} onClick={onRemove}><i className="fa fa-times"></i> Obriši račun</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default RacunSaBrutoCenomApp;