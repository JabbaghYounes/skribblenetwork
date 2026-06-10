import { Link } from 'react-router-dom'
import './nav-bar.css'

export default function NavBar() {
  return (
    <>
      <header>
        <div className="header">
          <div className="icon-container">
            <Link className='links' to={"/"}>Home</Link>
            <Link className='links' to={"/about"}>About</Link>
            <Link className='links' to={"/login"}>Login</Link>
            <Link className='links' to={"/Register"}>Register</Link>
          </div>
        </div>
      </header>
    </>
  )
}
