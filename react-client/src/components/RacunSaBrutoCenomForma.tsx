import { RacunSaBrutoCenom } from "../model/RacunSaBrutoCenom";
import { useState, useEffect } from 'react';
import { Radnik } from "../model/Radnik";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NacinPlacanja } from "../model/NacinPlacanja";

interface Props {
    racun: RacunSaBrutoCenom | null;
    radnici: Radnik[];
    naciniPlacanja: NacinPlacanja[];
    onPromeniRokPlacanja: (datum: string) => Promise<any>;
    onPromeniDatumIzdavanja: (datum: string) => Promise<any>;
    onPromeniRadnika: (radnik: Radnik) => Promise<any>;
    onPromeniNacinPlacanja: (nacin: NacinPlacanja) => Promise<any>;
    onPromeniOsnova: (osnova: string) => Promise<any>;
    onPromeniJMBG: (jmbg: number) => Promise<any>;
}
function RacuniForma(props: Props) {
    let [rokPlacanja, setRokPlacanja] = useState<Date | null>(null);
    let [datumIzdavanja, setDatumIzdavanja] = useState<Date | null>(null);
    let [osnova, setOsnova] = useState<string>('');
    let [ukupnaBrutoCena, setUkupnaBrutoCena] = useState<number>(0);
    let [jmbg, setJmbg] = useState<number>(0);
    let [nacinPlacanja, setNacinPlacanja] = useState<NacinPlacanja>();
    let [radnik, setRadnik] = useState<Radnik | null>();

    const getDatum = (datum: string) => {
        let date = datum.split('T');
        let split = date[0].split('-');
        return new Date(Number(split[0]), Number(split[1]) - 1, Number(split[2]));
    }

    useEffect(() => {
        if (props.racun !== null) {
            setRokPlacanja(getDatum(props.racun.rokPlacanja));
            setDatumIzdavanja(getDatum(props.racun.datumIzdavanja));
            setOsnova(props.racun.osnova);
            setUkupnaBrutoCena(props.racun.ukupnaBrutoCena);
            setJmbg(props.racun.jmbg);
            setNacinPlacanja(props.racun.nacinPlacanja);
            setRadnik(props.racun.radnik);
        } else {
            setRokPlacanja(null);
            setDatumIzdavanja(null);
            setOsnova('');
            setUkupnaBrutoCena(0);
            setJmbg(0);
            setNacinPlacanja(new NacinPlacanja(0, ''));
        }
    }, [props.racun])

    const dateToYMD = (date: Date) => {
        var d = date.getDate();
        var m = date.getMonth() + 1; //Month from 0 to 11
        var y = date.getFullYear();
        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }
    const promeniRadnika = async (r: number) => {
        const radnik = props.radnici.find(radnik => radnik.sifraRadnika === r);
        setRadnik(radnik!);
        await props.onPromeniRadnika(radnik!);
    }

    const promeniNacinPlacanja = async (np: number) => {
        const nacinPlacanja = props.naciniPlacanja.find((nacin: NacinPlacanja) => nacin.idNacinPlacanja === np);
        setNacinPlacanja(nacinPlacanja);
        await props.onPromeniNacinPlacanja(nacinPlacanja!);
    }
    const promeniRokPlacanja = async (d: Date) => {
        setRokPlacanja(d);
        await props.onPromeniRokPlacanja(dateToYMD(d));
    }
    const promeniDatumIzdavanja = async (d: Date) => {
        setDatumIzdavanja(d);
        await props.onPromeniDatumIzdavanja(dateToYMD(d));
    }

    const promeniOsnova = async (o: string) => {
        setOsnova(o);
        await props.onPromeniOsnova(o);
    }

    const promeniJMBG = async (jmbg: number) => {
        setJmbg(jmbg);
        await props.onPromeniJMBG(jmbg);
    }

    return (
        <form>
            <div className="form-row">
                <div className="form-group col-md-4">
                    <label className="col-form-label">Rok plaćanja</label>
                    <DatePicker
                        className="form-control"
                        selected={rokPlacanja}
                        onChange={(date: Date) => promeniRokPlacanja(date)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
                <div className="form-group col-md-4">
                    <label className="col-form-label">Datum izdavanja</label>
                    <DatePicker
                        className="form-control"
                        selected={datumIzdavanja}
                        onChange={(date: Date) => promeniDatumIzdavanja(date)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
                <div className="form-group col-md-4">
                    <label className="col-form-label">Primilac</label>
                    <select className="custom-select form-control" name="primalac" value={jmbg} onChange={(e) => promeniJMBG(Number(e.target.value))}>
                        <option value="0">Izaberite JMBG primaoca...</option>
                        <option>11099110897</option>
                        <option>10028910292</option>
                        <option>28098912345</option>
                    </select>
                </div>
                <div className="form-group col-md-4">
                    <label className="col-form-label">Osnova</label>
                    <input type="text" className="form-control" name="osnova" value={osnova} onChange={(e) => promeniOsnova(e.target.value)} />
                </div>
                {/* <div className="form-group col-md-4">
                    <label className="col-form-label">Ukupna bruto cena</label>
                    <input type="text" className="form-control" name="ukupnaBrutoCena" value={ukupnaBrutoCena} onChange={(e) => setUkupnaBrutoCena(Number(e.target.value))} readOnly />
                </div> */}
                <div className="form-group col-md-4">
                    <label className="col-form-label">Radnik</label>
                    <select className="custom-select form-control" name="radnik" value={radnik?.sifraRadnika} onChange={(e) => promeniRadnika(Number(e.target.value))}>
                        <option value="0">Izaberite radnika...</option>
                        {props.radnici.map(radnik => <option key={radnik.sifraRadnika} value={radnik.sifraRadnika}>{radnik.imePrezime}</option>)}
                    </select>
                </div>
                <div className="form-group col-md-4">
                    <label className="col-form-label">Način plaćanja</label>
                    <select className="custom-select form-control" name="nacinPlacanja" value={nacinPlacanja?.idNacinPlacanja} onChange={(e) => promeniNacinPlacanja(Number(e.target.value))}>
                        <option value="0">Izaberite način plaćanja...</option>
                        {props.naciniPlacanja.map(nacin => <option key={nacin.idNacinPlacanja} value={nacin.idNacinPlacanja}>{nacin.naziv}</option>)}
                    </select>
                </div>
            </div>
        </form>
    );
}
export default RacuniForma;