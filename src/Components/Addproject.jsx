import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../ContextAPI/ContextShare';




function  Addproject() {
  const{addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)
  const [show, setShow] = useState(false);

  const handleClose = () =>  {setShow(false);
     setProjectData({title:"",language:"",github:"",website:"",overview:"",projectImage:""})
     setPreview("")
  }
  const handleShow = () => setShow(true);

  const[fileStatus,setFileStatus]=useState(false)
  const[preview,setPreview]=useState("")


  const[projectData,setProjectData]=useState({
    title:"",language:"",github:"",website:"",overview:"",projectImage:""
  })
  // console.log(projectData);
  
  useEffect(()=>{
    // console.log(projectData.projectImage.type);
    if(projectData.projectImage.type=="image/png"||projectData.projectImage.type=="image/jpeg"||projectData.projectImage.type=="image/jpg"){
      // console.log("generate url");
      setPreview(URL.createObjectURL(projectData.projectImage));
      
      setFileStatus(false)
      
    }else{
      console.log("please upload the following file extensions (jpeg/png/jpg");
      setFileStatus(true)
      setProjectData({...projectData,projectImage:""})
      
    }
    

  },[projectData.projectImage])

     const handleAddProject =async()=>{
      const{title,language,github,website,overview,projectImage}= projectData

      if(!title || !language || !github || !website || !overview || !projectImage){
        toast.info("please fill empty fields")
      }else{
        // api call (reqBody)
        const reqBody = new FormData()
        reqBody.append("title",title)
        reqBody.append("language",language)
        reqBody.append("github",github)
        reqBody.append("website",website)
        reqBody.append("overview",overview)
        reqBody.append("projectImage",projectImage)
        //  api call (reqHeader)
         // api call (reqHeader)
         const token = sessionStorage.getItem("token")
         console.log(token);
         
       if(token){
         const reqHeader={
           "authorization":`Bearer ${token}`,
           "Content-Type":"multipart/form-data"
         }
         //api call
         try{
           const result = await addProjectAPI(reqBody,reqHeader)
           console.log(result);
           if(result.status==200){
            setAddProjectResponse(result.data)
             handleClose()
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
      
      <button className='btn btn-primary' onClick={handleShow}>Add Projects</button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <label>
                <input type="file" style={{display:"none"}} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})}/>
                <img width={"300px"} style={{marginLeft:"35px"}} src={preview?preview:"https://cdn2.iconfinder.com/data/icons/user-interface-web/550/user-interface-web_13-1024.png"} alt="" />
              </label>
              {fileStatus&& <div className="mt-3 text-danger">please upload the following file extensions (jpeg/png/jpg)</div>}
            </div>
            <div className="col-6">
                <div className='mb-3'>
                  <input type="text" className='form-control' placeholder='Project Title' onChange={e=>setProjectData({...projectData,title:e.target.value})} value={projectData.title}/>
                </div>

                <div className='mb-3'>
                  <input type="text" className='form-control' placeholder='Languages Used' onChange={e=>setProjectData({...projectData,language:e.target.value})} value={projectData.language}/>
                </div>

                <div className='mb-3'>
                  <input type="text" className='form-control' placeholder='GitHub Link' onChange={e=>setProjectData({...projectData,github:e.target.value})} value={projectData.github}/>
                </div>

                <div className='mb-3'>
                  <input type="text" className='form-control' placeholder='Website Link' onChange={e=>setProjectData({...projectData,website:e.target.value})} value={projectData.website}/>
                </div>

                <div className='mb-3'>
                  <input type="text" className='form-control' placeholder='Project Overview' onChange={e=>setProjectData({...projectData,overview:e.target.value})} value={projectData.overview}/>
                </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddProject}>Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-center" autoClose={2000} theme="colored"/>
    </>
  )
}

export default Addproject
