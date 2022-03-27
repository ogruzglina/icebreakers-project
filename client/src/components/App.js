import { Route, Switch } from "react-router-dom";
import Homepage from './Homepage';
import NavBar from './NavBar';
import Profile from './Profile';

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route exact path="/">
          <Homepage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
