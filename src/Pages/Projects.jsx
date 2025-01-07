import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import ProjectCard from '../Components/ProjectCard'
import { Col, Row } from 'react-bootstrap'
import { getAllProjectsAPI } from '../services/allAPI'

function Projects() {
     const[projects,setProjects]=useState([])
     const[searchKey,setSearchKey]=useState("")

     const getAllProjects= async()=>{
      const token = sessionStorage.getItem("token")
      console.log(token);

      if(token){
        const reqHeader={
          "authorization":`Bearer ${token}`,
          "Content-Type":"multipart/form-data"
        }
        // api call
        const result = await getAllProjectsAPI(searchKey,reqHeader)
        if(result.status===200){
          setProjects(result.data)
        }else{
          console.log(result);
          
        }
      }
     }
     console.log(projects);

     useEffect(()=>{
      getAllProjects()
     },[searchKey])
     
  return (
    <>
      <Header/>
      <div className="projects" style={{marginTop:"100px"}}>
        <h1 className='text-center mt-5 fw-bolder'>All Projects</h1>
        <div className="d-flex justify-content-center align-items-center w-100">
          <div className='d-flex border w-50 rounded mb-3'>
          <input onChange={e=>setSearchKey(e.target.value)} type="text" className='form-control' placeholder='search projects by technology' />
          <i style={{marginLeft:"-50px"}} class="fa-solid fa-magnifying-glass fa-rotate-90"></i>
        </div>
      </div>


      <Row className="mt-5 d-flex justify-content-center ms-3 w-100">
        {
          projects.length>0?projects.map((project,index)=>(
            <Col key={index} sm={12} md={6} lg={4}>
        <ProjectCard project={project}/>
        </Col>
          )):<p className='text-danger'>Nothing to display</p> }
      </Row>
          
      </div>
      
    </>
  )
}

export default Projects
