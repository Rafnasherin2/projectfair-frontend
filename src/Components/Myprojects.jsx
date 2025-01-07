import React, { useContext, useEffect, useState } from 'react'
import Addproject from '../Components/Addproject'
import { deleteprojectAPI, getUserProjectsAPI } from '../services/allAPI'
import { addProjectResponseContext,editProjectResponseContext } from '../ContextAPI/ContextShare'
import Editproject from './Editproject'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Myprojects() {
  const{addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)
  const{editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)

  const[projects,setProjects]=useState([])

  const getUserProjects= async()=>{
   const token = sessionStorage.getItem("token")
   console.log(token);

   if(token){
     const reqHeader={
       "authorization":`Bearer ${token}`,
       "Content-Type":"multipart/form-data"
     }
     // api call
     const result = await getUserProjectsAPI(reqHeader)
     if(result.status===200){
       setProjects(result.data)
     }else{
       console.log(result);
       
     }
   }
  }


  const handleDelete = async(pid)=>{
    const token = sessionStorage.getItem("token")
    console.log(token);
 
    if(token){
      const reqHeader={
        "authorization":`Bearer ${token}`,
        "Content-Type":"multipart/form-data"
      }
      try{
        const result = await deleteprojectAPI(pid,reqHeader)
        if(result.status==200){
          getUserProjects()
          }else{
            toast.warning(result.response.data)
          }
        
      }catch(err){
        console.log(err);
      }
  }
}
  console.log(projects);
  useEffect(()=>{
   getUserProjects()
  },[addProjectResponse,editProjectResponse])

  return (
    <>
   <div className='card shadow p-3 mt-5'>
    <div className="d-flex">
      <h2>My Projects</h2>
      </div>
      <div className="ms-auto">
          <Addproject/>
      </div>
      <div className="mt-4">
        {/* collection of user projects */}
       {projects.length>0?projects.map((project,index)=>(
          <div key={index} className='border d-flex align-items-center rounded p-3'>
          <h3 className='fw-bolder text-primary'>{project?.title}</h3>
          <div className='d-flex ms-auto'>
            <Editproject project={project}/>
            <a className='me-3 btn text-dark'><i class="fa-brands fa-github"></i></a>
            <button className='btn text-dark' onClick={()=>handleDelete(project?._id)}><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
       )): <p className='text-danger'>No Projects Added Yet!!!</p>}
       
      </div>
    </div>
    <ToastContainer position="top-center" autoClose={2000} theme="colored"/>

   </>
  )
}

export default Myprojects




