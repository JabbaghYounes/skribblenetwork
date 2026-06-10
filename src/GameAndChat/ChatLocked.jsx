import { Link } from 'react-router-dom';
import './ChatLocked.css';

// A non-functional look-alike of the chat panel, shown to signed-out
// visitors. The real message box is rendered behind a frosted overlay
// that invites the user to sign in.
export default function ChatLocked() {
  return (
    <div className="chat-locked">
      <div className="chat-locked-preview" aria-hidden="true">
        <div className="chat-locked-messages" />
        <div className="chat-locked-inputbar">
          <span className="chat-locked-placeholder">Message</span>
          <span className="chat-locked-send">Send</span>
        </div>
      </div>
      <div className="chat-locked-overlay">
        <p className="chat-locked-heading">Join the conversation</p>
        <p className="chat-locked-sub">Sign in to read and send messages.</p>
        <Link to="/login" className="chat-locked-button">Sign in to chat</Link>
      </div>
    </div>
  );
}
