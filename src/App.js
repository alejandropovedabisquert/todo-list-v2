import { useState } from 'react';
import Nav from './components/Nav';
import TodoList from './components/TodoList';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home';

const initialData = {
  projects:{
    "project-1":{
      id: "project-1",
      name: "Portfolio",
      content: {
        tasks: {
          "task-1": { id: "task-1", content: "I am task 1" },
          "task-2": { id: "task-2", content: "I am task 2" },
          "task-3": { id: "task-3", content: "I am task 3" },
          "task-4": { id: "task-4", content: "I am task 4" },
          "task-5": { id: "task-5", content: "I am task 5" },
          "task-6": { id: "task-6", content: "I am task 6" },
          "task-7": { id: "task-7", content: "I am task 7" },
          "task-8": { id: "task-8", content: "I am task 8" },
          "task-9": { id: "task-9", content: "I am task 9" },
        },
        tables: {
          "project-1-table-1": {
            id: "project-1-table-1",
            title: "Todo",
            taskIds: ["task-1", "task-2", "task-3", "task-4", "task-5", "task-6", "task-7", "task-8", "task-9"]
          },
          "project-1-table-2": {
            id: "project-1-table-2",
            title: "In Progress",
            taskIds: []
          },
          "project-1-table-3": {
            id: "project-1-table-3",
            title: "Done",
            taskIds: []
          }
        },
        tableOrder: ["project-1-table-1", "project-1-table-2", "project-1-table-3"]
      }
    },
    "project-2":{
      id: "project-2",
      name: "Prueba",
      content: {
        tasks: {
          "task-1": { id: "task-1", content: "I am task 1" },
          "task-2": { id: "task-2", content: "I am task 2" },
          "task-3": { id: "task-3", content: "I am task 3" },
          "task-4": { id: "task-4", content: "I am task 4" },
          "task-5": { id: "task-5", content: "I am task 5" },
          "task-6": { id: "task-6", content: "I am task 6" },
          "task-7": { id: "task-7", content: "I am task 7" },
          "task-8": { id: "task-8", content: "I am task 8" },
          "task-9": { id: "task-9", content: "I am task 9" },
        },
        tables: {
          "project-2-table-1": {
            id: "project-2-table-1",
            title: "Todo",
            taskIds: ["task-1", "task-2", "task-3", "task-4"]
          },
          "project-2-table-2": {
            id: "project-2-table-2",
            title: "In Progress",
            taskIds: ["task-5", "task-6", "task-7", "task-8", "task-9"]
          },
          "project-2-table-3": {
            id: "project-2-table-3",
            title: "Done",
            taskIds: []
          }
        },
        tableOrder: ["project-2-table-1", "project-2-table-2", "project-2-table-3"]
      }
    },
  },
  projectsOrder:["project-1", "project-2"],
}
function App() {
  const [data, setData] = useState(initialData)
  return (
    <div>
      <Nav data={data} setData={setData}/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        {data.projectsOrder !== undefined ? data.projectsOrder.map((projectId)=>{
            return(
              <Route exact path={projectId} element={<TodoList data={data} setData={setData} projectId={projectId}/>} key={projectId}/>
            )
        }): null}
        <Route path="*" element={<Navigate to="/" replace/>} />
      </Routes>
    </div>
  );
}

export default App;
