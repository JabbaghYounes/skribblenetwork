import { useState } from 'react';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../../Chat-live/src/firebase';
import './ChatLocked.css';

// Shown to a signed-in user whose email is not yet verified. Same frosted
// look as ChatLocked, but prompts them to verify (with a resend button)
// rather than to sign in.
export default function ChatUnverified() {
  const [status, setStatus] = useState('');

  const resend = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      setStatus('Verification email sent — check your inbox.');
    } catch (e) {
      setStatus('Could not send right now. Try again in a moment.');
    }
  };

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
        <p className="chat-locked-heading">Verify your email</p>
        <p className="chat-locked-sub">Click the link we emailed you, then refresh to join the chat.</p>
        <button className="chat-locked-button" type="button" onClick={resend}>Resend email</button>
        {status && <p className="chat-locked-sub">{status}</p>}
      </div>
    </div>
  );
}
