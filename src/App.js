import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Reservation from './pages/Reservation/Reservation';

function App() {
   return (
      <Router>
         <div className="App">
            <Switch>
               <Route exact path="/">
                  <Home />
               </Route>
               <Route path="/reservation">
                  <Reservation />
               </Route>
            </Switch>
         </div>
      </Router>
   );
}

export default App;
