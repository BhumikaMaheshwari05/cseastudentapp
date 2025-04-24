import React from 'react'
import {Link,Outlet, useNavigate} from 'react-router-dom'

function Home() {
  return (
    <div style={{height:'400px',width:'500px',fontSize:'40px',backgroundColor:'beige',color:"red",borderRadius:'6px',border:'2px solid brown'
    }}>Welcome To Student Management App
        <nav>
      <ul>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/register'>Register</Link></li>
      </ul>
      </nav>
    
    </div>

  )
}

export default Home;