import React, {useState} from 'react'
import {Link} from 'react-router-dom'

function Login( {setUser, navigate} ) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
   
    const [errors, setErrors] = useState([])

    function onSubmit(e){
        e.preventDefault()
        navigate('/')
        let user = {
            username,
            password
        }
       
        // console.log(user)

        fetch('/login',{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(user)
        })
        .then(res => res.json())
        .then(user => {
            console.log(user)
            if(user.errors) setErrors(user.errors)
        })
        console.log(errors)
        setUser(user);
        setUsername('');
        setPassword('');
    }


    return (
      <div className="container is-fluid">
        <div className="notification is-primary">
          <form onSubmit={onSubmit}>
            <label>
              Username
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>

            <label>
              Password
            <input type="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <input type="submit" value="Login" />
          </form>
          <Link to='/'>Home</Link>
        </div>
      </div>
    );
  }

  export default Login;