import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { server_url } from '../services/server_url';
import { editprojectAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectResponseContext } from '../ContextAPI/ContextShare';


function Editproject({project}) {

  const[preview,setPreview]=useState("")

  const [show, setShow] = useState(false);

  const{editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)

  const handleClose = () => {setShow(false);
    setProjectData({id:project._id,title:project.title, language:project.language, github:project.github, website:project.website, overview:project.overview, projectImage:""})
    setPreview(projectData.projectImage)
    }
    const handleShow = () => setShow(true);

    const[projectData,setProjectData]=useState({
     id:project._id,title:project.title, language:project.language, github:project.github, website:project.website, overview:project.overview, projectImage:""
    })

    useEffect(()=>{
      if(projectData.projectImage){
        setPreview(URL.createObjectURL(projectData.projectImage));
      }else{
        setPreview("");
      }
    },[projectData.projectImage])

    const handleUpdate=async()=>{
      const{ id,title,language,github,website,overview,projectImage }= projectData;

      if(!title || !language || !github || !website || !overview){
        toast.info("please fill the empty fields")
      }else{
        // api call (reqBody)
        const reqBody = new FormData()
        reqBody.append("title",title)
        reqBody.append("language",language)
        reqBody.append("github",github)
        reqBody.append("website",website)
        reqBody.append("overview",overview)
        preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)
        
         const token = sessionStorage.getItem("token")
         console.log((token));
         
       if(token){
         const reqHeader={
           "authorization":`Bearer ${token}`,
           "Content-Type":preview?"multipart/form-data":"application/json"
         }

                //api call
                try{
                  const result = await editprojectAPI(id,reqBody,reqHeader)
                  if(result.status==200){
                    handleClose()
                    setEditProjectResponse(result.data)
                  }else{
                    toast.warning(result.response.data);   
                  }
                }catch(err){
                  console.log(err);
                  
                }
              }
            }
          }

  return (
    <>
         <button onClick={handleShow} className='btn text-dark'><i class="fa-solid fa-pen-to-square"></i></button>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className='fw-bolder'>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className='row'>
          <div className="col-6">
            <label>
              <input type="file"  style={{display:"none"}} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})}/>
              <img width={"300px"} src={preview?preview:`${server_url}/uploads/${project?.projectImage}`}/>
            </label>
            <div className='mt-3 text-danger'>Please upload the following file extensions(jpeg/png/jpg)</div>
          </div>
          <div className="col-6 ">
            <div className="mb-3">
              <input type="text" className='form-control ' placeholder='Project title' value={projectData.title} onChange={e=>setProjectData({...projectData,title:e.target.value})}/>
            </div>
            <div className="mb-3">
              <input type="text" className='form-control' placeholder='Languages Used' value={projectData.language} onChange={e=>setProjectData({...projectData,language:e.target.value})}/>
            </div>
            <div className="mb-3">
              <input type="text" className='form-control' placeholder='GitHub Link' value={projectData.github} onChange={e=>setProjectData({...projectData,github:e.target.value})}/>
            </div>
            <div className="mb-3">
              <input type="text" className='form-control' placeholder='Website Link'value={projectData.website} onChange={e=>setProjectData({...projectData,website:e.target.value})}/>
            </div>
            <div className="mb-3">
              <input type="text" className='form-control' placeholder='Project Overview' value={projectData.overview} onChange={e=>setProjectData({...projectData,overview:e.target.value})}/>
            </div>
          </div>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate} >Update</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-center" autoClose={2000} theme="colored"/>

    </>
  )
}

export default Editproject