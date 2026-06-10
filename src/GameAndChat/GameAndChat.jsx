import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../Chat-live/src/firebase';
import AppGame from '../../c-game/src/App';
import AppChat from '../../Chat-live/src/App';
import LogOut from '../LogOut';

export default function GameAndChat() {
  const [user] = useAuthState(auth);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; // This is required for Chrome
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div>
      {user ? (
        <LogOut />
      ) : (
        <header>
          <div className="header">
            <div className="icon-container">
              <Link to="/login" className="links">Login</Link>
            </div>
          </div>
        </header>
      )}
      <div className="App">
        <div className="Game-container">
          <AppGame />
        </div>
        <div className="chat-container">
          {user ? (
            <AppChat />
          ) : (
            <div className="chat-signin-prompt">
              <p>Sign in to join the chat.</p>
              <Link to="/login" className="links">Sign in to chat</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
