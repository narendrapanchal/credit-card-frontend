import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'

function Header() {
  const {login,handleLogout}=useContext(UserContext);
  return (
    <header className='bg-slate-800 text-white w-full py-4 text-xl'>
      <div className='container flex justify-between '>

      <h2><Link to="/">Trending Cards</Link></h2>
      <ul className='flex justify-between gap-6 '>
        {login?.token&&<li><Link to="/add-card">Add Card</Link></li>}
        {login?.token&&<li><Link to="/applications">Applications</Link></li>}
        {login?.token?<button onClick={handleLogout}>Logout</button>:<li><Link to="/login">Login</Link></li>}
      </ul>
      </div>
    </header>
  )
}

export default Header
