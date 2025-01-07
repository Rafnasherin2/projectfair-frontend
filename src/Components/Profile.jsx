import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import { server_url } from '../services/server_url';

function Profile() {

  const [open, setOpen] = useState(false);
  const[userData,setUserData]=useState({
    username:"",email:"",password:"",profileImage:"",github:"",linkedin:""
  })
  const[existingImage,setExistingImage]=useState("")
  const[preview,setPreview]=useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("userDetails")){
      const userDetails = JSON.parse(sessionStorage.getItem("userDetails"))
      setUserData({...userData,username:userDetails.username,email:userDetails.email,password:userDetails.password,profileImage:userDetails.Profile,github:userDetails.github,linkedin:userDetails.linkedin})
      setExistingImage(userDetails)
    }
  },[open])

  useEffect(()=>{
    if(userData.profileImage){
      setPreview(URL.createObjectURL(userData.profileImage))
    }else{
      setPreview("")
    }
  },[userData.profileImage])

  console.log(userData);

  const handleUpdate =()=>{
    const { username,email,password,profileImage,github,linkedin}= userData

    if(!linkedin || !github){
      toast.info("please fill the missing fields")
    }else{
      // proceed to api call
      // api call(reqBody)
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
     preview?reqBody.append("profileImage",profileImage):reqBody.append("profileImage",existingImage)
    }
  }
  

  return (
    <div>
      <div className="card shadow p-5 mt-3 me-2">
        <div className="d-flex justify-content-between">
          <h1>Profile</h1>
          <button onClick={() => setOpen(!open)} className='btn btn-outline-info'>
            <i class="fa-solid fa-angle-down fa-beat-fade"></i>
          </button>
        </div>
        <Collapse in={open}>
        <div className="row justify-content-center mt-3">
          <label>
            <input type="file" style={{display:'none'}} onChange={e=>setUserData({...userData,profileImage:e.target.files[0]})}/>
            {existingImage==""?
            <img width={'200px'} height={'200px'} src={preview?preview:"https://www.pngitem.com/pimgs/m/78-786293_1240-x-1240-0-avatar-profile-icon-png.png"} alt="profile" />:
            <img width={'200px'} height={'200px'} src={`${server_url}/uploads/${existingImage}`} alt="profile" />}
          </label>
            <div className='mt-5'>
              <input type="text" placeholder='Github Link' className='form-control' value={userData.github} onChange={e=>setUserData({...userData,github:e.target.value})}/>
              <br/>
              <input type="text" placeholder='LinkedIn Link' className='form-control' value={userData.linkedin} onChange={e=>setUserData({...userData,linkedin:e.target.value})}/>
            </div>
            <div className='d-grid mt-2'>
              <button className='btn btn-warning' onClick={handleUpdate}>Update</button>
            </div>
        </div>
        </Collapse>
      </div>
    </div>
  )
}

export default Profile
