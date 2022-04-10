
import React from 'react'
import {useState, useEffect} from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import Button from './Button'
function TaskDetails() {
    const[loading, setLoading] = useState(true)
    const[task, setTask] = useState({})
    //const[error, setError] = useState(null)

    const baseUrl = "http://localhost:5000"
    const params = useParams()
    const navigate = useNavigate()
    const {pathname} = useLocation()

    useEffect(()=>{
        console.log("res",params);
        const fetchTask = async () =>{
            const res = await fetch(`${baseUrl}/api/posts/${params.id}`)
            
            const data = await res.json()
            if(res.status ===404){
               navigate('/')
            }

            setTask(data)
            setLoading(false)
        }
        fetchTask()
        return ()=>{
            console.log("ddd");
        }
    },[navigate,params])
    
    return loading ?(
        <h3>loading ...</h3>):(<div>
            <p>{pathname}</p>
            <h3>{task.text}</h3>
            <p>{task.day}</p>
            <Button onclick={()=>{navigate(-1)}} text='Go Back'/>
            </div>)
}
export default TaskDetails
