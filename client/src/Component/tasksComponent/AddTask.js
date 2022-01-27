import React, {useState} from 'react'
const AddTask = ({onAdd}) => {
const [text, setText] = useState('')
const [day, setDay] = useState('2022-01-01')
const [reminder, setreminder] = useState(false)

const onSubmit = (e)=>{
    e.preventDefault()
    if(!text){
        alert('please add a task')
        return
    }
    onAdd({text, day, reminder})
    setText('')
    setDay('2022-01-01')
    setreminder(false)
}



    return (
        <form className='add-form' onSubmit={onSubmit}>
         <div className='form-control'>
           <label>Task</label>
           <input type='text' className="form-control" placeholder='Addtask' value ={text}  onChange={(e)=>setText(e.target.value)}/>  
         </div> 
         <div className='form-control'>
           <label>Day & time</label>
           <input type='date' className="form-control" placeholder='Day and time' value ={day} onChange={(e)=>setDay(e.target.value)}/>  
         </div>
         <div className='form-control form-control-check' >
           <label>set reminder</label>
           <input type='checkbox' checked={reminder} value ={reminder} onChange={(e)=>setreminder(e.currentTarget.checked)} />  
         </div>   
         <input type='submit' value='save task' className='btn btn-block btn-success btn-lg' />
        </form>
    )
}

export default AddTask
