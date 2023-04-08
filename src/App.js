import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Nav from './components/Nav';
import Table from './components/Table';
import TableForm from './components/TableForm';
import TodoList from './components/TodoList';
import { Route, Routes } from 'react-router-dom';

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
  // tasks: {
  //   "task-1": { id: "task-1", content: "I am task 1" },
  //   "task-2": { id: "task-2", content: "I am task 2" },
  //   "task-3": { id: "task-3", content: "I am task 3" },
  //   "task-4": { id: "task-4", content: "I am task 4" },
  //   "task-5": { id: "task-5", content: "I am task 5" },
  //   "task-6": { id: "task-6", content: "I am task 6" },
  //   "task-7": { id: "task-7", content: "I am task 7" },
  //   "task-8": { id: "task-8", content: "I am task 8" },
  //   "task-9": { id: "task-9", content: "I am task 9" },
  // },
  // tables: {
  //   "table-1": {
  //     id: "table-1",
  //     title: "Todo",
  //     taskIds: ["task-1", "task-2", "task-3", "task-4", "task-5", "task-6", "task-7", "task-8", "task-9"]
  //   },
  //   "table-2": {
  //     id: "table-2",
  //     title: "In Progress",
  //     taskIds: []
  //   },
  //   "table-3": {
  //     id: "table-3",
  //     title: "Done",
  //     taskIds: []
  //   }
  // },
  // tableOrder: ["table-1", "table-2", "table-3"]
}
function App() {

  const [data, setData] = useState(initialData)

  return (
    <div>
      <Nav data={data} setData={setData}/>
      <Routes>
        {data.projectsOrder.map((projectId)=>{
            // console.log(projectId)
            return(
              <Route exact path={projectId} element={<TodoList data={data} setData={setData} projectId={projectId}/>} key={projectId}/>
            )
        })}
      </Routes>
      {/* <TodoList data={data} setData={setData}/> */}
      {/* <div className='ml-72'>
        {data.projectsOrder.map((projectId, index)=>{
          const project = data.projects[projectId]
          // console.log(project);
          // console.log(project.content.tableOrder)
          return(
            <DragDropContext onDragEnd={handleDragEnd} key={project.id}>
              <Droppable droppableId={project.id} direction='horizontal' type='table'>
                {(provided, snapshot)=>{
                  const style = {
                    backgroundColor: snapshot.isDraggingOver ? 'bg-red-400' : 'inherit',
                  }
                  return(
                    <>
                      <div className='ml-5'>
                        <h1 className='pt-3 text-2xl'>{project.name}</h1>
                        <TableForm data={data} setData={setData}/>
                      </div>
                      <div
                        className={`flex min-h-full ${style.backgroundColor}`}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {project.content.tableOrder.map((tableId, index) =>{
                          const table = project.content.tables[tableId]
                          // console.log(table);
                          const tasks = table.taskIds.map(taskId => project.content.tasks[taskId])
                          // console.log(tasks);
                          // console.log(project.content);
                          return(
                            <Table
                              index={index}
                              key={table.id}
                              table={table}
                              tasks={tasks}
                              data={project}
                              allData={data}
                              setData={setData}
                            />
                          )
                        })}
                        {provided.placeholder}
                      </div>
                    </>
                    
                  )
                }}
              </Droppable>
            </DragDropContext>
          )
        })}
      </div> */}
    </div>
  );
}

export default App;
