import { NacinPlacanja } from "../model/NacinPlacanja";
import { RacunSaBrutoCenom } from "../model/RacunSaBrutoCenom";
import { Radnik } from "../model/Radnik";

interface Props {
    racuni: RacunSaBrutoCenom[];
    radnici: Radnik[];
    nacini: NacinPlacanja[];
    selectedRow: number | null;
    setSelectedRow: (id: number | null) => any;
}

function RacunSaBrutoCenomTabela(props: Props) {

    const getFormattedDatum = (datum: string) => datum.split('T')[0];

    const setSelectedRow = (id: number) => {
        if (props.selectedRow === id) props.setSelectedRow(null);
        else props.setSelectedRow(id);
    }

    const getImePrezime = (id: Radnik) => {
        let radnik = props.radnici.find(radnik => radnik.sifraRadnika === id.sifraRadnika);
        return radnik ? radnik.imePrezime : 'proba';
    }

    const getNaciniPlacanja = (idNac: number) => {
        console.log(idNac);
        console.log(props.nacini);
        let nacin = props.nacini.find(nacin => nacin.idNacinPlacanja === idNac);
        return nacin ? nacin.naziv : 'ne radi';
    }


    return (
        <table className="table table-hover">
            <thead className="thead-inverse">
                <tr>
                    <th>Broj računa</th>
                    <th>Rok plaćanja</th>
                    <th>Datum izdavanja</th>
                    <th>Osnova</th>
                    <th>Primalac</th>
                    <th>Način plaćanja</th>
                    <th>Ukupna bruto cena</th>
                    <th>Odgovorno lice</th>
                </tr>
            </thead>
            <tbody id="table-body">
                {props.racuni.map(racun => (
                    <tr key={racun.brRacuna} className="table-row" style={props.selectedRow === racun.brRacuna ? { backgroundColor: "#BEB5B5" } : {}} onClick={() => setSelectedRow(racun.brRacuna)}>
                        <th scope="row">{racun.brRacuna}</th>
                        <td>{getFormattedDatum(racun.rokPlacanja)}</td>
                        <td>{getFormattedDatum(racun.datumIzdavanja)}</td>
                        <td>{racun.osnova}</td>
                        <td>{racun.jmbg}</td>
                        <td>{getNaciniPlacanja(racun.nacinPlacanja?.idNacinPlacanja)}</td>
                        <td>{racun.ukupnaBrutoCena}</td>
                        <td>{getImePrezime(racun.radnik)}</td>
                    </tr>

                ))}
            </tbody>
        </table>
    );
}
export default RacunSaBrutoCenomTabela;