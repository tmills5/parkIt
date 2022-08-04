import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Home from './components/Home';
import Navigation from './components/Navigation';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Discover from './components/Discover';
import ParkDetail from './components/ParkDetail';

function App() {
  const [parks, setParks] = useState([])
  const [user, setUser] = useState(null);
  //  const [errors, setErrors] = useState(false)
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-Api-Key': 'YQqHROTp15773aO6ZRsDCaFKX3WTEWbKqFf71V8e',
        'X-RapidAPI-Key': '9a9f03145bmsh082d0e7cede4082p1cd3a7jsn6c2d29c82494',
        'X-RapidAPI-Host': 'jonahtaylor-national-park-service-v1.p.rapidapi.com'
      }
    };
    
    fetch('https://jonahtaylor-national-park-service-v1.p.rapidapi.com/parks?limit=10', options)
      .then(response => response.json())
      .then(parksInitial => {
        console.log(parksInitial.data)
        // extracting just the array of parks-they're housed in object "data"
        setParks(parksInitial.data)
      })
      .catch(err => console.error(err));

      // auto logging in the user and directing them to login if not
    fetch('/auth')
      .then(res => {
        if(res.ok){
          res.json()
          .then(user => setUser(user))
        }
      })
  },[]);


  return (
    <div className="App">
      <Navigation user={user} setUser={setUser} />
      <hr/>
      <Routes>

        <Route exact path='/' element={ <Home  user={user} />} />
        <Route exact path='/parks' element={ <Discover parks={parks} setParks={setParks} />} />
        <Route exact path='/parks/:id' element={ <ParkDetail />} />
        <Route exact path='/logout' element={ <Logout />} />
        <Route exact path='/signup' element={ <Signup setUser={setUser} navigate={navigate} />} />
        <Route exact path='/login' element={ <Login user={user} setUser={setUser} navigate={navigate} />} />
        
        
      </Routes>
    </div>
  );
}

export default App;