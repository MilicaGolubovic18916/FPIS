import { Link, withRouter } from "react-router-dom";


const Navigation = (props: { location: { pathname: string; }; }) => (
    <div className="navigation">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Puzzle Group
                </Link>

                <div>
                    <ul className="navbar-nav ml-auto">
                        <li
                            className={`nav-item  ${props.location.pathname === "/" ? "active" : ""
                                }`}
                        >
                            <Link className="nav-link" to="/">
                                Home
                                <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li
                            className={`nav-item  ${props.location.pathname === "obavestenjaOUplatama" ? "active" : ""
                                }`}
                        >
                            <Link className="nav-link" to="/obavestenjaOUplatama">
                                Obaveštenja o izvršenim uplatama
                            </Link>
                        </li>
                        <li
                            className={`nav-item  ${props.location.pathname === "/racuni" ? "active" : ""
                                }`}
                        >
                            <Link className="nav-link" to="/racuni">
                                Računi
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
);
export default withRouter(Navigation);