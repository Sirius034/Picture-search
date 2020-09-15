import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from './hoc/Layout';
import { Home } from './Pages/Home';
import { Profile } from './Pages/Profile';
import { About } from './Pages/About';
import { Favorite } from './Pages/Favorite';
import { Login } from './Pages/Login';
import { FirebaseContext } from './context/firebase/firebaseContext';

export const App = () => {
  const { token } = useContext(FirebaseContext);
  
  let routs = (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/about" component={About} />
      <Redirect to="/" />
    </Switch>
  );
    //token
  if (token) {
    routs = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/about" component={About} />
        <Route path="/favorite" component={Favorite} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Layout>
      {routs}
    </Layout>
  );
}

