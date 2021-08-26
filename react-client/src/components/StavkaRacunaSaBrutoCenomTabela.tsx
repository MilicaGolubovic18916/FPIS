import { RacunSaBrutoCenom } from "../model/RacunSaBrutoCenom";
import { useEffect, useState } from 'react';
import { StavkaRacunaSaBrutoCenom } from "../model/StavkaRacunaSaBrutoCenom";

interface Props {
    racun: RacunSaBrutoCenom | null;
    selectedRow: number | null;
    setSelectedRow: (id: number | null) => any;
}

function StavkeTabela(props: Props) {
    let [stavke, setStavke] = useState<StavkaRacunaSaBrutoCenom[]>([]);

    const setSelectedRow = (id: number) => {
        if (props.selectedRow === id) props.setSelectedRow(null);
        else props.setSelectedRow(id);
    }

    useEffect(() => {
        if (props.racun != null) {
            setStavke(props.racun.stavkeRacuna);
        } else {
            setStavke([]);
        }
    }, [props.racun]);

    return (
        <table className="table table-hover">
            <thead className="thead-inverse">
                <tr>
                    <th>Redni broj</th>
                    <th>Račun</th>
                    <th>Naziv stavke</th>
                    <th>Neto cena</th>
                    <th>Marža</th>
                    <th>Bruto cena</th>
                </tr>
            </thead>
            <tbody id="table-body">
                {stavke.map(stavka => {
                    if (stavka.status === "Obrisana") {
                        return null
                    } else {
                        return (
                            <tr key={stavka.rb} className="table-row" style={props.selectedRow === stavka.rb ? { backgroundColor: "#BEB5B5" } : {}} onClick={() => setSelectedRow(stavka.rb)}>
                                <th scope="row">{stavka.rb}</th>
                                <td>{stavka.brRacuna}</td>
                                <td>{stavka.nazivStavke}</td>
                                <td>{stavka.netoCena}</td>
                                <td>{stavka.marza}</td>
                                <td>{stavka.brutoCena}</td>
                            </tr>
                        )
                    }
                })}
            </tbody>
        </table>
    );
}
export default StavkeTabela;