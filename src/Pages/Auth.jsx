import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TokenAuthContext } from '../ContextAPI/TokenAuth'


function Auth({register}) {
  const{isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)

    const isRegisterForm=register? true : false
    const navigate =useNavigate()

    const [userData, setUserData] = useState({
       username: "", email: "", password: ""
    })

    const handleRegister =async(e)=>{
      e.preventDefault()
    // console.log(userData);
    const{ username, email, password}= userData

    if(!username||!email||!password){
      toast.info("please fill empty fields")
    }else{
      // alert("proceed to api call")
      try{
        const result =  await registerAPI(userData)
        console.log(result);
        if(result.status===200){
          toast.success(`${result.data.username} has successfully registered`)
          navigate('/login')
          setUserData({username:"", email:"", password:""})
        }else{
          toast.warning(result.response.data)
        }
      }catch{
        console.log(err);
        
      }
    }
    }

     const handleLogin= async(e)=>{
      e.preventDefault()
      const{ email,password}= userData

      if(!email||!password){
        toast.info("please fill empty field")
      }else{
        //alert("proceed to api call")
        
        try{
          const result = await loginAPI({email,password})
          console.log(result);
          if(result.status===200){
            sessionStorage.setItem("username",result.data.existingUser.username)
            sessionStorage.setItem("userDetails",JSON.stringify(result.data.existingUser))
            sessionStorage.setItem("token",result.data.token)
            navigate('/')
            setIsAuthorized(true)
            setUserData({email:"", password:""})
          }else{
            toast.warning(result.response.data)
          }
          
        }catch(err){
          console.log(err);
          
        }
      }
     }

  return (
    <>
    <div className="d-flex justify-content-center align-items-center">
        <div className="container w-75">
            <Link to={'/'} style={{textDecoration:'none',color:'light',fontWeight:'bolder'}}><i class="fa-solid fa-arrow-left"></i>Back to Home</Link>
          <div className="card shadow bg-info p-5">
            <div className="row align-items-center">
                <div className="col-lg-6">
                <img src="https://static.vecteezy.com/system/resources/previews/006/916/298/non_2x/biometric-authentication-concept-illustration-vector.jpg" alt="" width={"100%"}/>
            </div>
                <div className="col-lg-6 text-center">
                    <h1 className='fw-bolder text-light'><i className="fa-solid fa-list-check me-2"></i>Project-Fair</h1>
                    <h5 className='text-light'>
                       {
                        isRegisterForm? "Sign up to your account":"Sign in to your account"
                       }
                       </h5>
                       <Form className="w-100 mt-3">
                        {
                            isRegisterForm &&
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputName">
                            <Form.Control type="text" placeholder="Enter Your UserName" onChange={e => setUserData({ ...userData, username: e.target.value })} value={userData.username} />
                            </Form.Group>
                        }

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInputEmail">
                            <Form.Control type="email" placeholder="Enter Your Email" onChange={e => setUserData({ ...userData, email: e.target.value })} value={userData.email} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputPswd">
                            <Form.Control type="password" placeholder="Enter Your Password" onChange={e => setUserData({ ...userData, password: e.target.value })} value={userData.password} />
                            </Form.Group>
                       </Form>
                       {
                        isRegisterForm?
                       <div>
                         <button className='btn btn-dark text-light m-3 d-grid' onClick={handleRegister}>Register</button>
                         <p>Already have an Account?Click Here.. <Link to={'/login'}style={{textDecoration:"none",color:"green"}}>Login</Link></p>
                       </div>:
                       <div>
                         <button className='btn btn-dark text-light m-3 d-grid' onClick={handleLogin}>Login</button>
                         <p>New User?Click Here.. <Link to={'/register'}style={{textDecoration:"none",color:"red"}}>Register</Link></p>
                       </div>
                       }
            </div>
            <ToastContainer position="top-center" autoClose={2000} theme="colored"/>
            </div>  
        </div>
    </div> 
    </div>
      
    </>
  )
}

export default Auth
