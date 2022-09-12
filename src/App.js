import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from 'react';
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [showAddTask, setShowAddTask] = useState (false)
  const [tasks, setTasks] = useState([])
  useEffect (() => {
   const getTasks = async() => {
    const tasksFromServer = await fetchTasks()
    setTasks(tasksFromServer)

   }

    getTasks()
  }, [])

  //get all tasks
  const fetchTasks = async () => {
    const res = await fetch ('http://localhost:5000/tasks')
    const data =await res.json()
    return data
  }

  //get single task
  const fetchTask = async (id) => {
    const res = await fetch (`http://localhost:5000/tasks/${id}`)
    const data =await res.json()
    return data
  }
      //add task

     const addTask = async (task) => {

      const res = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
      })

      const data = await res.json()
      setTasks([...tasks, data])

      // console.log(task)

      // const id = Math.floor(Math.random() *10000) + 1

      // const newTask = { id, ...task }  
      // // setTasks({...tasks, newTask})
      // // tasks.push(newTask)
      // console.log(tasks)
      // setTasks({...tasks, newTask})
    } 

    // deleting task

    const deleteTask = async (id) => {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE'
      })
      setTasks(tasks.filter((task) => task.id !== id))
    }

   
    

    const toggleReminder = async (id) => {
      const taskToToggle = await fetchTask(id)
      const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'Application/json'
        },
        body: JSON.stringify(updTask)
      })

      const data = await res.json()

      setTasks(tasks.map((task)=> task.id=== id ? {...task, reminder: !data.reminder}: task)) 
    }
  return (
    <Router> 
    <div className="container">
      <Header onAdd={()=> setShowAddTask(!showAddTask)}
      showAdd ={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? (<Tasks tasks={tasks} 
      onDelete={deleteTask}
      onToggle={toggleReminder} />) : (
        'No Tasks Big Boy')}
        <Routes>
        <Route path='/about' component = {About} />
        </Routes>
        <Footer />
    </div>
    </Router>
  );
}

export default App;
