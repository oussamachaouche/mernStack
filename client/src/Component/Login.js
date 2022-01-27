import React from 'react'

import {useState, useEffect} from 'react'
import  {Navigate} from 'react-router-dom'
import axios from 'axios'
import { useAlert } from 'react-alert'

const Login = () => {

  const baseUrl = "http://localhost:5000"

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const [isLoggIn, setisLoggIn] = useState(false)
 const [track, settrack] = useState('')   

 const alert = useAlert()


 useEffect(()=>{
  console.log('trackcccc',track);
  if(track ==='done'){
      setisLoggIn(true)
  }
},[track])


 const loginUser = async (userLogin)=>{
  
    await axios({
     method: 'POST',
     url: `${baseUrl}/api/user/login`,
     headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
             },
     data: JSON.stringify(userLogin),
 })
     .then(result => {
       localStorage.setItem('auth-token', result.data)
   
         console.log(result.data);
         console.log(result.headers);
         alert.show('you are logged')
         settrack('done')
     })
     .catch(error => {
       console.log(error.response.data)
       alert.show(error.response.data)
    })
   }


const onSubmit = (e)=>{
    e.preventDefault()
   loginUser({email, password})
    setEmail('')
    setPassword('')
    
  /* console.log('trackcccc',track);
   settrack('start request to backend')
  
       settrack('done')
       console.log('trackcccc2',track);
     */ 
}



/*{(a===10) && (
    <Navigate to="/dashboard" replace={true} />
  )}*/
 


    return (
        <div >
        {!isLoggIn ?(
         <form className='add-form' onSubmit={onSubmit}>
         <div className="form-group form-inline">
          <label className="form-label">Email:</label>
          <input type="email" className="form-control"  placeholder="Enter email" value ={email} onChange={(e)=>setEmail(e.target.value)} />
         </div>
         <div className="mb-3">
           <label className="form-label">Password:</label>
          <input type="password" className="form-control"  placeholder="Enter password" value ={password} onChange={(e)=>setPassword(e.target.value)}/>
         </div>
         <input type='submit' value='Login' className='btn btn-block btn-primary btn-lg' />
        </form>   ):  <Navigate to="/" replace={true} />  }
        
        </div>
    )
}

export default Login
