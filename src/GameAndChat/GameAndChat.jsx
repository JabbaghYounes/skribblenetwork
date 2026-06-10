import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../Chat-live/src/firebase';
import AppGame from '../../c-game/src/App';
import AppChat from '../../Chat-live/src/App';
import ChatLocked from './ChatLocked';
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
      <header className="topbar">
        <Link to="/" className="topbar-title">Sudorky</Link>
        <nav className="topbar-nav">
          <Link to="/about" className="links">About</Link>
          {user ? <LogOut /> : <Link to="/login" className="links">Login</Link>}
        </nav>
      </header>
      <div className="App">
        <div className="Game-container">
          <AppGame />
        </div>
        <div className="chat-container">
          {user ? <AppChat /> : <ChatLocked />}
        </div>
      </div>
    </div>
  );
}
