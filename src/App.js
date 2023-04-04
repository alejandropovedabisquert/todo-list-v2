import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Table from './components/Table';
import TableForm from './components/TableForm';

const initialData = {
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
    "table-1": {
      id: "table-1",
      title: "Todo",
      taskIds: ["task-1", "task-2", "task-3", "task-4", "task-5", "task-6", "task-7", "task-8", "task-9"]
    },
    "table-2": {
      id: "table-2",
      title: "In Progress",
      taskIds: []
    },
    "table-3": {
      id: "table-3",
      title: "Done",
      taskIds: []
    }
  },
  tableOrder: ["table-1", "table-2", "table-3"]
}
function App() {

  const [data, setData] = useState(initialData)

  const handleDragEnd = ({destination, source, draggableId, type}) =>{
    if(!destination) return

    if(destination.droppableId === source.droppableId && destination.index === source.index){
      return
    }

    const start = data.tables[source.droppableId]
    const end = data.tables[destination.droppableId]

    if (type === "table") {
      console.log(destination, source, draggableId)
      const newOrder = [...data.tableOrder]
      newOrder.splice(source.index, 1)
      newOrder.splice(destination.index, 0, draggableId)

      setData({
        ...data,
        tableOrder: newOrder
      })
      return
    }

    if(start === end){
      const table = data.tables[source.droppableId]
      const taskIds = [...table.taskIds]

      taskIds.splice(source.index, 1)
      taskIds.splice(destination.index, 0, draggableId)

      const newTable = {
        ...table,
        taskIds
      }
      setData({
        ...data,
        tables:{
          ...data.tables,
          [table.id]: newTable
        }
      })
      return
    }

    const startTaskIds = [...start.taskIds]
    const endTaskIds = [...end.taskIds]

    startTaskIds.splice(source.index, 1)
    endTaskIds.splice(destination.index, 0, draggableId)

    const newStartTable = {
      ...start,
      taskIds: startTaskIds
    }

    const endTaskTable = {
      ...end,
      taskIds: endTaskIds
    }

    setData({
      ...data,
      tables: {
        ...data.tables,
        [start.id]: newStartTable,
        [end.id]: endTaskTable
      }
    })


  }

  return (
    <div>
      <h1 className='ml-5 text-2xl'>TODO List</h1>
      <TableForm data={data} setData={setData}/>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId='all-tables' direction='horizontal' type='table'>
          {(provided, snapshot)=>{
            const style = {
              backgroundColor: snapshot.isDraggingOver ? 'bg-red-400' : 'inherit',
            }
            return(
              <div
                className={`flex pt-3 min-h-full ${style.backgroundColor}`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {data.tableOrder.map((tableId, index) =>{
                  const table = data.tables[tableId]
                  const tasks = table.taskIds.map(taskId => data.tasks[taskId])

                  return(
                    <Table
                      index={index}
                      key={table.id}
                      table={table}
                      tasks={tasks}
                    />
                  )
                })}
                {provided.placeholder}
              </div>
            )
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
