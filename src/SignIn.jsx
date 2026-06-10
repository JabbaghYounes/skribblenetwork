// import React, { useState } from 'react'
// import GoogleButton from 'react-google-button'
// import './SignIn.css'
// import {auth} from './firebase'
// import {GoogleAuthProvider, signInWithRedirect} from 'firebase/auth'
// import { Navigate } from 'react-router-dom';
// import './firebase'
// // import GoogleButton from 'react-google-button';

// const SignIn = () => {
//   const [isValid, setIsValid] = useState(false);

//   const googleSignIn = (event) => {
//     event.preventDefault();
//     const provider = new GoogleAuthProvider()
//     signInWithRedirect(auth, provider)
//     setItTrue()
//     console.log(isValid)
//   }
 
// function setItTrue(){
//   setIsValid(true)

//   return(
//     setIsValid(true)
//   )
// }

//   console.log("googleButton: ", isValid)

//   return (
//     <div className='wrapper'>
//         <GoogleButton className='googlebutton' onMouseDown={googleSignIn} />
//         {isValid && <Navigate to="/App"/>}
//     </div>
//   )
// }





// export default SignIn

import { useState, useEffect } from 'react';
import GoogleButton from 'react-google-button';
import './SignIn.css';
import { auth } from '../Chat-live/src/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

const SignIn = () => {
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const googleSignIn = async (event) => {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='wrapper'>
      {loading ? (
        <div className='loading'>Loading...</div>
      ) : (
        <GoogleButton className='googlebutton' onClick={googleSignIn} />
      )}
      {isValid && <Navigate to="/" />}
    </div>
  );
};

export default SignIn;
