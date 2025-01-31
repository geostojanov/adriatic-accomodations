import { Link } from 'react-router-dom'

// styles
import './Navbar.css'

export default function Navbar() {
  return (
    <div className='navbar'>
      <nav>
        <Link className='brand' to="/">
          <h1>Adriatic Accomodations</h1>
        </Link>  
      </nav>
    </div>
  )
}
