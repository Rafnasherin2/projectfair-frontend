import React, { useEffect, useState } from 'react'
import ProjectCard from '../Components/ProjectCard'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Row } from 'react-bootstrap'
import titleImage from '../assets/images/alaminxyz.gif'
import { getHomeProjectAPI } from '../services/allAPI'



function Home() {
  
  const[loggedIn,setLoggedIn]=useState(false)
  const navigate = useNavigate()

  const[projects,setProjects]=useState([])

  const getHomeProject=async()=>{
    const result= await getHomeProjectAPI()

    if(result.status==200){
      setProjects(result.data)
    }else{
      setProjects([])
    }
  }
  console.log(projects);
  

  useEffect(()=>{
    getHomeProject()
    if(sessionStorage.getItem("token")){
      setLoggedIn(true)
    }else{
      setLoggedIn(false)
    }
  },[])

  const handleProjectsPage=()=>{
    if(sessionStorage.getItem("token")){
      navigate("/projects")
    }else{
      alert("please login")
    }

  }

  return (
    <>
    <div style={{width:"100%",height:"85vh"}} className="container-fluid rounded bg-info">
        <Row className="align-items-center p-5">
            <Col sm={12} md={6}>
            <h1 style={{fontSize:"80px"}} className='fw-bolder text-light'><i className="fa-solid fa-list-check me-2"></i> Project-Fair</h1>
            <p className='text-light'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error recusandae corporis ullam, eos aperiam facere natus quod ea! Molestiae fugit corrupti nam consequuntur voluptas voluptatum atque soluta pariatur esse vero.
            Ex nesciunt quam mollitia? Fuga, dolores odio. Rem veritatis necessitatibus saepe distinctio impedit unde harum rerum optio. Dolore hic doloribus beatae delectus assumenda fuga neque quas possimus deleniti quidem. Distinctio!</p>
           {loggedIn?<Link to={'/dashboard'} className="btn btn-warning">Manage Your Projects</Link>
           :<Link to={'/login'} className="btn btn-warning">Start To Explore</Link>}
            </Col>

            <Col sm={12} md={6}>
            <img width={'500px'} src={titleImage} alt="title"/>
            </Col>

        </Row>
      
    </div>
    {/* projects */}

    <div className="all-projects mt-5">
        <h1 className='text-center text-primary'>Explore Your Projects</h1>
        <marquee scrollAmount={25}>
        <Row>
          {projects.length>0?projects.map((project,index)=>(
              <Col key={index} sm={12} md={6} lg={4}>
              <ProjectCard project={project}/>
             </Col> 
            )):null
           }
        </Row>
        </marquee>
        <div className='text-center mt-5'>
           <button className='btn' style={{textDecoration:"none",color:"blue"}} onClick={handleProjectsPage}>View More Projects</button></div>
    </div>
    </>
  )
}

export default Home
