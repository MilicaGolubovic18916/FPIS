import { ObavestenjeOUplatama } from "../model/ObavestenjeOUplatama";
import { Radnik } from '../model/Radnik';

interface Props {
    obavestenjaOUplatama: ObavestenjeOUplatama[];
    radnici: Radnik[];
    selectedRow: number | null;
    setSelectedRow: (id: number | null) => any;
}

function ObavestenjaOUplatamaTabela(props: Props) {

    const setSelectedRow = (id: number) => {
        if (props.selectedRow === id) props.setSelectedRow(null);
        else props.setSelectedRow(id);
    }

    const getImePrezime = (id: Radnik) => {
        let radnik = props.radnici.find(radnik => radnik.sifraRadnika === id.sifraRadnika);
        console.log(radnik?.imePrezime);
        return radnik ? radnik.imePrezime : 'proba';
    }

    const getFormattedDatum = (datum: string) => datum.split('T')[0];

    return (
        <table className="table table-hover">
            <thead className="thead-inverse">
                <tr>
                    <th>ID obavestenja</th>
                    <th>Datum unosa</th>
                    <th>Svrha</th>
                    <th>Primalac</th>
                    <th>Odgovorno lice</th>
                </tr>
            </thead>
            <tbody id="table-body">
                {props.obavestenjaOUplatama.map(obavestenje => (
                    <tr key={obavestenje.idObavestenja} className="table-row" style={props.selectedRow === obavestenje.idObavestenja ? { backgroundColor: "#BEB5B5" } : {}} onClick={() => setSelectedRow(obavestenje.idObavestenja)}>
                        <th scope="row">{obavestenje.idObavestenja}</th>
                        <td>{getFormattedDatum(obavestenje.datum)}</td>
                        <td>{obavestenje.svrhaObavestenja}</td>
                        <td>{obavestenje.jmbg}</td>
                        <td>{getImePrezime(obavestenje.radnik)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ObavestenjaOUplatamaTabela;