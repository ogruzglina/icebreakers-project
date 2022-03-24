import { Route, Switch } from "react-router-dom";
import Homepage from './Homepage';

function App() {
  // return (
  //   <>
  //     <Switch>
  //       <Route exact path="/">
  //         <div>Home</div>
  //         {/* <Homepage

  //         /> */}
  //       </Route>
  //       <Route path="/profile">
  //         <div>Profile</div>
  //         {/* <Profile
  
  //         /> */}
  //       </Route>
  //     </Switch>
  //   </>
  // );


  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/movies">
          <MoviesPage movies={movies} />
        </Route>
        <Route exact path="/">
          <div>Home</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
