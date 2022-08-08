import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Home from './components/Home';
import Navigation from './components/Navigation';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import ParksPage from './components/ParksPage';
import ParkDetail from './components/ParkDetail';
import EditReviewForm from './components/EditReviewForm';

function App() {
  const [parks, setParks] = useState([])
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAuth();
    getParks();
    getReviews();
  },[]);

    const getParks = () => {
      fetch('/parks')
      .then(response => response.json())
      .then(parksInitial => {
        console.log(parksInitial)
        setParks(parksInitial)
      })
      .catch(err => console.error(err));
    }

    const getReviews = () => {
      fetch('/reviews')
      .then(response => response.json())
      .then(reviewsInitial => {
        // console.log(reviewsInitial)
        setReviews(reviewsInitial)
      })
      .catch(err => console.error(err));
    }

    // auto logging in the user and directing them to login if not
    const getAuth = () => {  
      fetch('/authorized_user')
      .then((response)=> {
        if(response.ok) {
          response.json()
          .then((user)=> setUser(user))
        }
      })
      // .then(res => {
      //   if(res.ok){
      //     res.json()
      //     .then(user => 
      //       setUser(user)
      //       )
      //   }
      // })
    }
// console.log(user)

  return (
    <div className="App">
      <Navigation user={user} setUser={setUser} />
      <hr/>
      <Routes>

        <Route exact path='/' element={ <Home  user={user} />} />
        <Route exact path='/parks' element={ <ParksPage parks={parks} user={user} />} />
        <Route exact path='/parks/:id' element={ <ParkDetail user={user} reviews={reviews} setReviews={setReviews}/>} />
        <Route exact path='/logout' element={ <Logout />} />
        <Route exact path='/signup' element={ <Signup setUser={setUser} navigate={navigate} />} />
        <Route exact path='/login' element={ <Login user={user} setUser={setUser} navigate={navigate} />} />
        <Route exact path='/EditReviewForm' element={ <EditReviewForm reviews={reviews}/>} />
        
        
      </Routes>
    </div>
  );
}

export default App;