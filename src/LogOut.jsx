import { auth } from './firebase';

const LogOut = () => {
  const signOut = () => {
    auth.signOut();
  };

  return (
    <button onClick={signOut} className="links">
      Logout
    </button>
  );
};

export default LogOut;
