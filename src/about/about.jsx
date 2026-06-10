import { Link } from 'react-router-dom';
import NavBar from '../naveBar/nav-bar';
import './about.css';

export default function About() {
  return (
    <>
      <NavBar />
      <div className="about-container">
        <h1 className="about-title">About Sudorky</h1>
        <p className="about-text">
          Sudorky pairs a fresh Sudoku puzzle with a real-time group chat. Open
          the page and a new puzzle is generated for you every time — no account
          required.
        </p>
        <p className="about-text">
          Want to talk while you play? Sign in to unlock the chat and send
          messages to everyone else online. The puzzle is always free to play;
          only the chat needs an account.
        </p>
        <p className="about-text">
          Built with React and Vite, with Firebase handling authentication and
          the live chat.
        </p>
        <Link to="/" className="links">Back to the game</Link>
      </div>
    </>
  );
}
