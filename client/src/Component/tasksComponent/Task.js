import React from 'react';
import {FaTimes} from 'react-icons/fa'
import { Link } from 'react-router-dom';
const Task = ({task,onDelete,onToggle}) => {
    return (
        <div className ={`task bg-info ${task.reminder ?'reminder':''}`} onDoubleClick={()=>onToggle(task._id)}>
           <h3>{task.text}<FaTimes onClick={()=>onDelete(task._id)} style={{color:'red', cursor:'pointer'}}/></h3> 
           <p>{task.day}</p>
           <p><Link to={`/task/${task._id}`}>View details</Link></p>
            
        </div>
    )
}

export default Task