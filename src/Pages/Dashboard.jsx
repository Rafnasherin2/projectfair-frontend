import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import MyProjects from '../Components/Myprojects'
import { Col, Row } from 'react-bootstrap'
import Profile from '../Components/Profile'


function Dashboard() {

  const[username,setUsername]=useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("username")){
      setUsername(sessionStorage.getItem("username"))
    }else{
      setUsername("")
    }
  },[])

  return (
    <div>
      <Header insideDashboard/>
      <Row>

        {/* my projects */}
        <Col sm={12} md={8}>
        <h2 style={{marginLeft:"35px"}} className='mt-4'>Welcome <span className='text-warning fw-bolder'>{username}</span></h2>
        <MyProjects/>
        </Col>

         {/* my projects */}
         <Col sm={12} md={4}>
        <Profile/>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
