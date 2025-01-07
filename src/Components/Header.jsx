import React, { useContext } from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { TokenAuthContext } from '../ContextAPI/TokenAuth'


function Header({insideDashboard}) {
  const{isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)
  const navigate = useNavigate()
  const handleLogout =()=>{

    sessionStorage.removeItem("token")
    sessionStorage.removeItem("username")
    setIsAuthorized(false)
    navigate('/')
  }

  return (
    <div>
      <Navbar className="bg-info">
        <Container>
          <Navbar.Brand>
            <Link to={'/'} style={{textDecoration:"none",color:"white"}}>
            <i className="fa-solid fa-list-check me-2"></i>
            Project-Fair</Link>
          </Navbar.Brand>
         { insideDashboard&&<Button onClick={handleLogout} className='btn btn-danger'>Logout</Button>}
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
