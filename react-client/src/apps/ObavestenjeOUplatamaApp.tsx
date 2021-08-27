import { useState, useEffect } from 'react';
import { ObavestenjeOUplatama } from '../model/ObavestenjeOUplatama';
import { addObavestenjeOUplatama, getAllObavestenjaOUplatama, getAllRadnici, removeObavestenjeOUplatama, updateObavestenjeOUplatama } from '../service/api';
import Header from '../components/Header';
import ObavestenjaOUplatamaTabela from '../components/ObavestenjeOUplatamaTabela';
import ObavestenjeOUplatamaForma from '../components/ObavestenjeOUplatamaForma';
import './App.css';
import Alert from 'react-popup-alert'


function ObavestenjeOUplatamaApp() {

    let [obavestenjaOUplatama, setObavestenjaOUplatama] = useState<ObavestenjeOUplatama[]>([]);
    let [obavestenjeOUplatama, setObavestenjeOUplatama] = useState<ObavestenjeOUplatama | null>(null);
    let [radnici, setRadnici] = useState([]);
    let [selectedRow, setSelectedRow] = useState<number | null>(null);
    let [error, setError] = useState('');


    const getObavestenjaOUplatama = async () => {
        try {
            setObavestenjaOUplatama(await getAllObavestenjaOUplatama());
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

    useEffect(() => {
        (async function () {
            await getObavestenjaOUplatama();
            await getRadnici();
        })();
        if (selectedRow !== null) {
            setObavestenjeOUplatama(obavestenjaOUplatama.find((obav: ObavestenjeOUplatama) => obav.idObavestenja === selectedRow)!);
        }
    }, []);

    const onAdd = async (obavestenjeOUplatama: ObavestenjeOUplatama) => {
        try {
            let res = await addObavestenjeOUplatama(obavestenjeOUplatama);
            if (res.error) setError(res.error);
            else {
                setObavestenjaOUplatama([...obavestenjaOUplatama, { ...res }]);
            }
        } catch (e) {
            setError("Network error.");
        }
    }

    const onRemove = async () => {
        try {
            const idObavestenja = selectedRow!;
            await removeObavestenjeOUplatama(idObavestenja);
            setObavestenjaOUplatama(obavestenjaOUplatama.filter((obav: ObavestenjeOUplatama) => obav.idObavestenja !== idObavestenja));
            setSelectedRow(null)
        } catch (e) {
            console.log(e);
            setError("Network error.");
        }
    }

    const onUpdate = async (obavestenjeOUplatama: ObavestenjeOUplatama) => {
        try {
            let res = await updateObavestenjeOUplatama(obavestenjeOUplatama);
            if (res.error) setError(res.error);
            else {
                setObavestenjaOUplatama(obavestenjaOUplatama.map((obav: ObavestenjeOUplatama) => obav.idObavestenja === obavestenjeOUplatama.idObavestenja ? obavestenjeOUplatama : obav));
            }
        } catch (e) {
            setError("Network error.");
        }
    }

    const onPromeniRadnika = async (radnik: number) => {

    }
    const onPromeniDatum = async (datum: string) => {
        if (obavestenjeOUplatama !== null) {
            let obav = new ObavestenjeOUplatama(obavestenjeOUplatama!.idObavestenja,
                datum,
                obavestenjeOUplatama!.svrhaObavestenja,
                obavestenjeOUplatama.idObavestenjaHotela,
                obavestenjeOUplatama.idObavestenjaPrevoza,
                obavestenjeOUplatama.idObavestenjaOsiguranja,
                obavestenjeOUplatama.jmbg,
                obavestenjeOUplatama.radnik);
            setObavestenjeOUplatama(obav);
        }
    }

    return (
        <>
            <Header />
            <div className="container">
                <h1 className="display-4">Obaveštenja o izvršenim uplatama</h1>
                <div className="row">
                    {error && <h1>{error}</h1>}
                    <ObavestenjaOUplatamaTabela
                        obavestenjaOUplatama={obavestenjaOUplatama}
                        selectedRow={selectedRow}
                        setSelectedRow={(idObavestenja) => setSelectedRow(idObavestenja)}
                        radnici={radnici}
                    />
                </div>
                <div className='okvir'>
                    <div className="row justify-content-center">
                        <div className="col-8">
                            <ObavestenjeOUplatamaForma
                                obavestenjaOUplatama={obavestenjaOUplatama}
                                selectedRow={selectedRow}
                                radnici={radnici}
                                onAdd={onAdd}
                                onRemove={onRemove}
                                onUpdate={onUpdate}
                                onPromeniRadnika={onPromeniRadnika}
                                onPromeniDatum={onPromeniDatum}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>

    );

}
export default ObavestenjeOUplatamaApp;