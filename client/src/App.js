import { useState,useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import axios from 'axios'
import NavBar from './Component/NavBar';
import Header from './Component/tasksComponent/Header';
import Login from './Component/Login'; 
import Register from './Component/Register'
import AddTask from './Component/tasksComponent/AddTask';
import Tasks from './Component/tasksComponent/Tasks';
import About from './Component/tasksComponent/About'
import TaskDetails from './Component/tasksComponent/TaskDetails'
import Footer from './Component/tasksComponent/Footer'




function App() {
 //header tasks properties
 //const location = useLocation()
 const baseUrl = "http://10.10.0.117:5000"
  const title = "My tasks";
  const [showAddTask,setShowAddTask] = useState(false);
// tasks array state
const [tasks,setTask] = useState( []);
//const navigate = useNavigate();
  useEffect(()=>{
   /*const getTasks = async()=>{
     const tasksFromServer = await fetchTasks()
     
     setTask(tasksFromServer)
   }
    getTasks()*/
    //const fetchTasks = async ()=>{
      //const token = localStorage.getItem('auth-token');
     // console.log(token);
     const getTasks = async()=>{
    await axios.get(`${baseUrl}/api/posts/p`)
   .then(result => {
     // localStorage.getItem('auth-token')
     // console.log(result.data);
  //console.log(result.headers);
  setTask(result.data)
    })
    
    .catch(error => console.log(error.response.data))
    }
    getTasks()
  },[])





/*
   const fetchTasks = async () =>{
    const res = await fetch('http://localhost:5000/api/posts/p')
    return await res.json()
  
  }
*/


const deletstorage = async ()=>{
  const token = localStorage.getItem('auth-token');
  console.log(token);
  localStorage.removeItem("auth-token");

}
const privateRoute = async ()=>{
  const token = localStorage.getItem('auth-token');
  console.log(token);
axios.get(`${baseUrl}api/posts`,{ headers: {"auth-token" : token} })
.then(result => {
  localStorage.getItem('auth-token')
  console.log(result.data);
  console.log(result.headers);
})

.catch(error => console.log(error.response.data))
}



//add new task axios
const addTask = async (task)=>{
  const token = localStorage.getItem('auth-token');
  console.log(token);
  await axios({
    method: 'POST',
    url: `${baseUrl}/api/posts`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'auth-token' : token
            },
    data: JSON.stringify(task),
})
.then(result => {
  //localStorage.getItem('auth-token')
  console.log(result);
  console.log(result.data);
  setTask([...tasks,result.data])
  console.log(result.headers);
})

.catch(error => console.log(error.response.data))
}
//add new task
/*const addTask = async (task)=>{
  const token = localStorage.getItem('auth-token');
  const res = await fetch('http://localhost:5000/api/posts',{
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'auth-token' : token

    },
    body: JSON.stringify(task)

  })
  try {
    const data = await res.json()
  setTask([...tasks,data])
  } catch (error) {
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<erooor")
    console.log(error.data)
  }
  
   /*
   const id = Math.floor(Math.random() * 10000) +1
   const newTask = {id,...task}
   console.log(newTask)
   setTask([...tasks, newTask])
   */
 //}

//delete task
const deleteTask = async (id) =>{
  await fetch(`${baseUrl}/api/posts/${id}`,{
    method: 'DELETE'
  })
setTask(tasks.filter((task)=>task._id !==id),console.log(tasks))
}

  //fetchTaskSingular
  const fetchTask = async (id) =>{
    const res = await fetch(`${baseUrl}/api/posts/${id}`)
    return await res.json()
  }

//update toggle reminder
const toggleReminder = async(id) =>{
  const taskToToggle = await fetchTask(id);
  console.log("taskToToggle",taskToToggle);
  const updTask = {...taskToToggle,
 reminder:!taskToToggle.reminder}
 console.log("updTask",updTask);

 const res = await fetch(`${baseUrl}/api/posts/${id}`,{
   method:'PATCH',
   headers: {'Content-type': 'application/json',
             'Accept': 'application/json'},
   body: JSON.stringify(updTask)
 })

//const data = await res.json();
// console.log("data",data.reminder);
console.log("res",res);
console.log("id",id);
console.log("task",tasks);
 setTask(
   tasks.map((task) => 
   task._id === id ? {...task, reminder: updTask.reminder}:task)
 )
}




  return (
    
       <Router>
         <NavBar/>



       


        
    <div className='containerr bg-light'>
    <Routes>
    <Route  exact path='/register'  element={<Register />}/>
    <Route  path='/login'  element={<Login  />}/>
    <Route  path='/'   element={<>
      <Header  title ={title} onAdd={()=>setShowAddTask(!showAddTask)} showAdd ={showAddTask} />
    {showAddTask &&<AddTask onAdd={addTask}/>}
    {tasks.length>0? (
       <Tasks 
         tasks={tasks} 
          onDelete={deleteTask} 
          onToggle={toggleReminder}/>
          ):(
         'no task to show')}
       </>}/>
       <Route  path='/about'  element={<About/>}/>
       <Route path='/task/:id'  element={<TaskDetails/>}/>
       </Routes>
       <Footer/>
    </div>
    </Router>
  
     
  );
}

export default App;
