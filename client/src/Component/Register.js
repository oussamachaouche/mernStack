import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'

const Register = () => {

  const baseUrl = "http://10.10.0.117:5000"

    const [name, setUserName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const alert = useAlert()

const onSubmit = (e)=>{
    e.preventDefault()
    if(!name){
        alert('please add a task')
        return
    }
    addUser({name, email, password})
    setUserName('')
    setEmail('')
    setPassword('')
}



const addUser = async (user)=>{
  /*  const res = await fetch('http://localhost:5000/api/user/registre',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
 
    });
    try {
      const data = await res.json()
     console.log("user id "+data._id+" saved") ; 
    } catch (error) {
      console.log(error);
    }
   */
   await axios({
    method: 'POST',
    url: `${baseUrl}/api/user/registre`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
            },
    data: JSON.stringify(user),
})
    .then(result => {
      console.log("resuuuult",result)
        console.log(JSON.stringify(user))
      alert.show('Thank you! \n Your registration was successful!')
    })
    .catch(error =>{
      console.log(error.response.data.message)
      alert.show(error.response.data.message)
    } )
  }

    return (
        <div >
           <form className='add-form' onSubmit={onSubmit}>
         <div className='form-group form-inline'>
           <label className="form-label">User Name</label>
           <input type='text' className="form-control" placeholder='User Name' value ={name}  onChange={(e)=>setUserName(e.target.value)}/>  
         </div> 
         <div className='form-group form-inline'>
           <label>Email</label>
           <input type='email'className="form-control" placeholder='email' value ={email} onChange={(e)=>setEmail(e.target.value)}/>  
         </div>
         <div className='form-group form-inline'>
           <label>password</label>
           <input type='password' className="form-control" placeholder='password' value ={password} onChange={(e)=>setPassword(e.target.value)}/>  
         </div>
         <input type='submit' value='Register' className='btn btn-block btn-primary btn-lg' />
        </form> 
        </div>
    )
}

export default Register
