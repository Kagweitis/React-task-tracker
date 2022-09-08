import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState } from 'react';


function App() {
  const [tasks, setTasks] = useState(
    [
        {
         id : 1,
         text : 'The Appointment',
         day: 'Mon 10th, 2pm',
         reminder: true,
        },
        {
         id : 2,
         text : 'The second Appointment',
         day: 'Tue 10th, 2pm',
         reminder: true,
        },
        {
         id : 3,
         text : 'The third Appointment',
         day: 'Wed 10th, 2pm',
         reminder: false,
        }
         
     ]
)
  return (
    <div className="container">
      <Header />
      <Tasks tasks={tasks} />
    </div>
  );
}

export default App;
