import { ObavestenjeOUplatama } from "../model/ObavestenjeOUplatama";
import { useState, useEffect } from 'react';
import { Radnik } from "../model/Radnik";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Alert from 'react-popup-alert';

interface Props {
    obavestenjaOUplatama: ObavestenjeOUplatama[];
    radnici: Radnik[];
    selectedRow: number | null;
    onPromeniDatum: (datum: string) => Promise<any>;
    onPromeniRadnika: (radnik: number) => Promise<any>;
    onAdd: (obavestenjaOUplatama: ObavestenjeOUplatama) => Promise<any>;
    onUpdate: (obavestenjaOUplatama: ObavestenjeOUplatama) => Promise<any>;
    onRemove: () => Promise<any>;

}

function ObavestenjaOUplatamaForma(props: Props) {

    let [datum, setDatum] = useState<Date | null>(null);
    let [svrhaObavestenja, setSvrhaObavestenja] = useState<string>('');
    let [primalac, setPrimalac] = useState<number>(0);
    let [radnik, setRadnik] = useState<Radnik | null>();
    let [idObavHotela, setIdObavHotela] = useState<number>(0);
    let [idObavPrevoza, setIdObavPrevoza] = useState<number>(0);
    let [idObavOsiguranja, setIdObavOsiguranja] = useState<number>(0);


    const getDatum = (datum: string) => {
        let date = datum.split('T');
        let split = date[0].split('-');
        return new Date(Number(split[0]), Number(split[1]) - 1, Number(split[2]));
    }

    const [alert, setAlert] = React.useState({
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

    useEffect(() => {
        if (props.selectedRow !== null) {
            let obavestenje: ObavestenjeOUplatama = props.obavestenjaOUplatama.find((obav: ObavestenjeOUplatama) => obav.idObavestenja === props.selectedRow)!;
            setDatum(getDatum(obavestenje.datum));
            setSvrhaObavestenja(obavestenje.svrhaObavestenja);
            setPrimalac(obavestenje.jmbg);
            setRadnik(obavestenje.radnik);
            setIdObavHotela(obavestenje.idObavestenjaHotela);
            setIdObavOsiguranja(obavestenje.idObavestenjaOsiguranja);
            setIdObavPrevoza(obavestenje.idObavestenjaPrevoza);
        } else {
            setDatum(new Date());
            setSvrhaObavestenja('');
            setIdObavPrevoza(0);
            setIdObavHotela(0);
            setIdObavOsiguranja(0);
            setPrimalac(0);
            setRadnik(new Radnik(0, ''))
        }
    }, [props.selectedRow])

    const dateToYMD = (date: Date) => {
        var d = date.getDate();
        var m = date.getMonth() + 1; //Month from 0 to 11
        var y = date.getFullYear();
        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }

    const promeniDatum = async (d: Date) => {
        setDatum(d);
        await props.onPromeniDatum(dateToYMD(d));
    }

    const promeniRadnika = async (r: number) => {
        if (r === 0) {
            return
        }
        const radnik = props.radnici.find(radnik => radnik.sifraRadnika === r);
        setRadnik(radnik!);
        await props.onPromeniRadnika(radnik!.sifraRadnika);
    }

    const onAdd = async (e: any) => {
        e.preventDefault();
        if (datum !== null && svrhaObavestenja !== '' && primalac !== 0 && radnik?.sifraRadnika !== 0 && idObavHotela !== 0 && idObavOsiguranja !== 0 && idObavPrevoza !== 0) {
            await props.onAdd(new ObavestenjeOUplatama(0, dateToYMD((datum! as Date)), svrhaObavestenja, idObavHotela, idObavPrevoza, idObavOsiguranja, primalac, radnik!));
            setDatum(new Date());
            setSvrhaObavestenja('');
            setIdObavPrevoza(0);
            setIdObavHotela(0);
            setIdObavOsiguranja(0);
            setPrimalac(0);
            setRadnik(new Radnik(0, ''))
            onShowAlert('success', 'Uspešno ste dodali obaveštenje!');
        } else {
            onShowAlert('warning', `Popunite pravilno sva polja!`);
        }
    }

    const onRemove = async (e: any) => {
        e.preventDefault();
        await props.onRemove();
    }

    const onUpdate = async (e: any) => {
        e.preventDefault();
        if (datum !== null && svrhaObavestenja !== '' && primalac !== 0 && radnik?.sifraRadnika !== 0 && idObavHotela !== 0 && idObavOsiguranja !== 0 && idObavPrevoza !== 0) {
            await props.onUpdate(new ObavestenjeOUplatama(props.selectedRow!, dateToYMD((datum! as Date)), svrhaObavestenja, idObavHotela, idObavPrevoza, idObavOsiguranja, primalac, radnik!));
            onShowAlert('success', 'Uspešno ste izmenili obaveštenje!');
        } else {
            onShowAlert('warning', `Popunite pravilno sva polja!`);
        }
    }
    return (
        <form>
            <div className="form-row">
                <div className="form-group col-md-4">
                    <label className="col-form-label">Datum</label>
                    <DatePicker
                        className="form-control"
                        selected={datum}
                        onChange={(date: Date) => promeniDatum(date)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
                <div className="form-group col-md-4">
                    <label className="col-form-label">Radnik</label>
                    <select className="custom-select form-control" name="radnik" value={radnik?.sifraRadnika} onChange={(e) => promeniRadnika(Number(e.target.value))}>
                        <option value="0">Izaberite radnika...</option>
                        {props.radnici.map(radnik => <option key={radnik.sifraRadnika} value={radnik.sifraRadnika}>{radnik.imePrezime}</option>)}
                    </select>
                </div>
                <div className="form-group col-md-4">
                    <label className="col-form-label">Primilac</label>
                    <select className="custom-select form-control" name="primalac" value={primalac} onChange={(e) => setPrimalac(Number(e.target.value))}>
                        <option value="0">Izaberite JMBG primaoca...</option>
                        <option>11099110897</option>
                        <option>10028910292</option>
                        <option>28098912345</option>
                    </select>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-4">
                    <label className="col-form-label">ID obaveštenja hotela</label>
                    <select className="custom-select form-control" name="hotel" value={idObavHotela} onChange={(e) => setIdObavHotela(Number(e.target.value))}>
                        <option value="0">Izaberite obaveštenje...</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div className="form-group col-md-4">
                    <label className="col-form-label">ID obaveštenja osiguranja</label>
                    <select className="custom-select form-control" name="osiguranje" value={idObavOsiguranja} onChange={(e) => setIdObavOsiguranja(Number(e.target.value))}>
                        <option value="0">Izaberite obaveštenje...</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div className="form-group col-md-4">
                    <label className="col-form-label">ID obaveštenja prevoza</label>
                    <select className="custom-select form-control" name="prevoz" value={idObavPrevoza} onChange={(e) => setIdObavPrevoza(Number(e.target.value))}>
                        <option value="0">Izaberite obaveštenje...</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-3">
                    <label className="col-form-label">Svrha</label>
                    <textarea name="svrha" value={svrhaObavestenja} onChange={(e) => setSvrhaObavestenja(e.target.value)} />
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-4">
                    <button id="btn-add" className="btn btn-primary" disabled={props.selectedRow !== null} onClick={onAdd}><i className="fa fa-plus"></i> Dodaj</button>
                </div>
                <div className="col-md-4">
                    <button id="btn-update" className="btn btn-success " disabled={props.selectedRow === null} onClick={onUpdate}><i className="fa fa-pencil"></i> Izmeni</button>
                </div>
                <div className="col-md-4">
                    <button id="btn-delete" className="btn btn-danger" disabled={props.selectedRow === null} onClick={onRemove}><i className="fa fa-times"></i> Obriši</button>
                </div>
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
        </form>
    )
}
export default ObavestenjaOUplatamaForma


