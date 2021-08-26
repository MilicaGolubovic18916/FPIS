import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Home, ObavestenjeOUplatamaApp, RacunSaBrutoCenomApp } from './components';


function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/obavestenjaOUplatama" exact component={() => <ObavestenjeOUplatamaApp />} />
          <Route path="/racuni" exact component={() => <RacunSaBrutoCenomApp />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;