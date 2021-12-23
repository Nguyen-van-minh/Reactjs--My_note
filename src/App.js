import Nav from './View/Nav/Nav';
import Home from './View/Home/Home';
import Todo from './View/Todo/Todo';
import Note from './View/Note/Note';
import Notfound from './View/notfound/Notfound';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/todo'>
            <Todo />
          </Route>
          <Route path='/note'>
            <Note />
          </Route>
          <Route path='*'>
            <Notfound />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
