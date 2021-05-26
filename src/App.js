import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { grey, orange } from '@material-ui/core/colors';
import Home from './pages/Home/Home';
import Reservation from './pages/Reservation/Reservation';
import Summary from './pages/Summary/Summary';

const theme = createMuiTheme({
   palette: {
      primary: grey,
      secondary: orange,
   },
});

function App() {
   return (
      <Router>
         <ThemeProvider theme={theme}>
            <Switch>
               <Route exact path="/">
                  <Home />
               </Route>
               <Route path="/reservation">
                  <Reservation />
               </Route>
               <Route path="/summary">
                  <Summary />
               </Route>
            </Switch>
         </ThemeProvider>
      </Router>
   );
}

export default App;
