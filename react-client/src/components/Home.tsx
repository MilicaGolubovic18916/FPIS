import React from 'react';
import logo from '../slike/puzzle.png';

const Home = () => (
    <div className="home">
        <div className="container">
            <div className="row align-items-center my-5">
                <div className="col-lg-7">
                    <img
                        className="img-fluid rounded mb-4 mb-lg-0"
                        src={logo}
                        alt="http://placehold.it/900x400"
                    />
                </div>
                <div className="col-lg-5">
                    <h1 className="font-weight-light">Puzzle Group</h1>
                    <p>
                        Istorija Puzzle-a datira još od početka 2003-te godine kada su osnivači bili na početku svojih studentskih dana.
                        Tada su uvideli da ne postoji dosledna organizacija koja se isključivo bavi omladinskim turizmom
                        i počeli su da iz hobija i ljubavi prema putovanjima organizuju za svoje prijatelje kreativna, originalna i jeftina putovanja.

                        Taj duh je opstao do danas kada se pristupa veoma odgovorno i profesionalno poslu,
                        do tog nivoa da se novi trendovi koje smo uveli u domaći  turizam izučavaju i na postdiplomskim studijama.


                        Puzzle Group kao organizacija formalno postoji od 2009. kada je par mladih entuzijasta nezadovoljnih klasičnim ponudama putovanja
                        odlučilo da se posveti kreiranju putovanja i zabave koja bi zadovoljila potrebe ljudi u njihovom uzrastu.
                        Slagalica kao motiv i ime simboliše potrebu mladih za poznastvima, deljenjem iskustava,
                        lepih i pozitivnih uspomena kreiranih kroz putovanja.

                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default Home;