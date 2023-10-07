import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>
          <Route exact path="/">
            {/* Content for the home page */}
          </Route>
          {/* Add more routes for your other components */}
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;