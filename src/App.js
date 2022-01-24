import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './Navbar';
import Adduser from './pages/Adduser';
import Edituser from './pages/Edituser';
import Viewuser from './pages/Viewuser';

const App = () => {
  return (
    <>
      <Navbar />
      <br /><br /><br />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users/add" component={Adduser} />
        <Route exact path="/users/edit/:id" component={Edituser} />
        <Route exact path="/users/:id" component={Viewuser} />
      </Switch>
    </>
  );
};

export default App;