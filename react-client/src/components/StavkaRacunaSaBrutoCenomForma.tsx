import { RacunSaBrutoCenom } from "../model/RacunSaBrutoCenom";
import { StavkaRacunaSaBrutoCenom } from "../model/StavkaRacunaSaBrutoCenom";
import { useState, useEffect } from 'react';
import React from 'react';
import Alert from 'react-popup-alert';


interface Props {
    racun: RacunSaBrutoCenom | null;
    selectedRow: number | null;
    onAdd: (stavka: StavkaRacunaSaBrutoCenom) => Promise<any>;
    onUpdate: (stavke: StavkaRacunaSaBrutoCenom) => Promise<any>;
    onRemove: () => Promise<any>;

}

function StavkeForma(props: Props) {

    let [nazivStavke, setNazivStavke] = useState<string>('');
    let [netoCena, setNetoCena] = useState<number>(0);
    let [marza, setMarza] = useState<number>(0);
    let [brutoCena, setBrutoCena] = useState<number>(0);

    const [alert, setAlert] = React.useState({
        type: 'error',
        text: 'This is a alert message',
        show: false
    });

    useEffect(() => {
        if (props.racun !== null) {
            if (props.selectedRow !== null) {
                let stavka: StavkaRacunaSaBrutoCenom = props.racun.stavkeRacuna.find((s: StavkaRacunaSaBrutoCenom) => s.rb === props.selectedRow)!;
                setNazivStavke(stavka.nazivStavke);
                setNetoCena(stavka.netoCena);
                setMarza(stavka.marza);
                setBrutoCena(stavka.brutoCena);
            } else {
                setNazivStavke('');
                setNetoCena(0);
                setMarza(0);
                setBrutoCena(0);
            }
        }
    }, [props.selectedRow, props.racun])

    function onCloseAlert() {
        setAlert({
            type: '',
            text: '',
            show: false
        })
    }

    const onAdd = async (e: any) => {
        e.preventDefault();
        if (netoCena !== 0 && netoCena > 0 && marza >= 0 && nazivStavke !== '') {
            let indeksi: any[] = [];
            let maxID = 0;
            for (var i = 0; i < props.racun!.stavkeRacuna.length; i++) {
                indeksi.push(props.racun!.stavkeRacuna[i].rb);
            }
            if (indeksi.length !== 0) {
                maxID = Math.max(...indeksi);
            }
            let s = new StavkaRacunaSaBrutoCenom(maxID + 1, props.racun!.brRacuna, nazivStavke, netoCena, marza, netoCena + netoCena * (marza / 100));
            await props.onAdd(s);
        } else if (netoCena === 0 || netoCena < 0 || marza < 0) {
            console.log(netoCena);
            console.log(marza);
            onShowAlert('warning', `Neto cena i marža moraju biti pozitivni brojevi, pri čemu marža može biti i 0.`);
        } else {
            onShowAlert('warning', `Morate uneti naziv stavke.`);
        }
    }

    const onRemove = async (e: any) => {
        e.preventDefault();
        await props.onRemove();
    }

    const onUpdate = async (e: any) => {
        e.preventDefault();
        if (netoCena !== 0 && netoCena > 0 && marza >= 0 && nazivStavke !== '') {
            await props.onUpdate(new StavkaRacunaSaBrutoCenom(props.selectedRow!, props.racun!.brRacuna, nazivStavke, netoCena, marza, netoCena + netoCena * (marza / 100)));
        } else if (netoCena === 0 || netoCena < 0 || marza < 0) {
            onShowAlert('warning', `Neto cena i marža moraju biti pozitivni brojevi, pri čemu marža može biti i 0.`);
        } else {
            onShowAlert('warning', `Morate uneti naziv stavke.`);
        }
    }

    function onShowAlert(type: any, text: string) {
        setAlert({
            type: type,
            text: text,
            show: true
        })
    }

    return (
        <form>
            <div className="form-row">
                <div className="form-group col-md-4">
                    <label className="col-form-label">Naziv stavke</label>
                    <input type="text" className="form-control" name="nazivStavke" value={nazivStavke} onChange={(e) => setNazivStavke(e.target.value)} />
                </div>
                <div className="form-group col-md-4">
                    <label className="col-form-label">Neto cena</label>
                    <input type="number" className="form-control" name="netoCena" value={netoCena} onChange={(e) => setNetoCena(Number(e.target.value))} />
                </div>
                <div className="form-group col-md-4">
                    <label className="col-form-label">Marža</label>
                    <input type="number" className="form-control" name="marza" value={marza} onChange={(e) => setMarza(Number(e.target.value))} />
                </div>
                {/* <div className="form-group col-md-4">
                    <label className="col-form-label">Bruto cena</label>
                    <input type="text" className="form-control" name="brutoCena" value={brutoCena} onChange={(e) => setBrutoCena(Number(e.target.value))} readOnly />
                </div> */}

            </div>
            <div className="form-row">
                <div className="col-md-4">
                    <button id="btn-add" className="btn btn-primary" onClick={onAdd} disabled={props.selectedRow !== null}><i className="fa fa-plus"></i>Dodaj stavku</button>
                </div>
                <div className="col-md-4">
                    <button id="btn-update" className="btn btn-success " disabled={props.selectedRow === null} onClick={onUpdate}><i className="fa fa-pencil"></i>Izmeni stavku</button>
                </div>
                <div className="col-md-4">
                    <button id="btn-delete" className="btn btn-danger" disabled={props.selectedRow === null} onClick={onRemove}><i className="fa fa-times"></i>Obriši stavku</button>
                </div>
                <Alert
                    header={'Upozorenje!'}
                    btnText={'Zatvori upozorenje'}
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
        </form>

    );
}
export default StavkeForma;