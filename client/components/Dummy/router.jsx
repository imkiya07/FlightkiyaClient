// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import FlightCard from '../flightResult/flightCard';


const App = () => {
  return (
    <Router>
      <div>
        {/* Routes */}
        <Switch>

          <Route path="/flight-result" component={FlightCard} />
         
        </Switch>
      </div>
    </Router>
  );
};

export default App;
