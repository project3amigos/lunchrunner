import React from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import App from './App';
import Home from './Home/Home';
import Create from './Create/Create';
import Join from './Join/Join';
import JoinDetails from './JoinDetails/JoinDetails';
import Profile from './Profile/Profile';
import Callback from './Callback/Callback';
import Final from './Final/Final'
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
        <div>
          <div className="text-center">
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
          </div>
          <Route path="/create" render={(props) => <Create auth={auth} {...props} />} />
          <Route path="/join" render={(props) => <Join auth={auth} {...props} />} />
          <Route path="/joindetails" render={(props) => <JoinDetails auth={auth} {...props} />} />
          <Route path="/final" render={(props) => <Final auth={auth} {...props} />} />
          <Route path="/profile" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/home"/>
            ) : (
              <Profile auth={auth} {...props} />
            )
          )} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>        
        </div>
      </Router>
  );
}
