import { useState } from 'react';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';
import NavBar from '../naveBar/nav-bar';
import SignIn from '../SignIn';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isValid, setIsValid] = useState(false);

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage(null);

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setErrorMessage("Loged in")
      setIsValid(true)
    } catch (error) {
      setErrorMessage("Wrong email or password");
      setIsValid(false)
    }
  }

  return (
    <>
    <NavBar/>
    <form onSubmit={handleSubmit}>
      <div className="card-control">
             <div className="card-container">
                  <div className="card-body">
                         <h2 className='card-title'>Login</h2>
        <input type="email" placeholder='Enter your email' className='inputs inputA' value={email} onChange={handleEmailChange} />
        <br />
        <input type="password" placeholder='Enter your password' className='inputs inputB' value={password} onChange={handlePasswordChange} />

        <br/>
        <br/>
              <button type="submit" className='buttont'>Login</button>
              <SignIn/>
              <br></br>
              {errorMessage && <div className="error">{errorMessage}</div>}
              { isValid && <Navigate to="/"/>}
      </div>
      </div>
      </div>
      </form>
    </>
  );
}
export default Login;
