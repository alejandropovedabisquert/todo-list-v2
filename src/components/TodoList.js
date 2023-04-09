import { DragDropContext, Droppable } from "react-beautiful-dnd"
import Table from "./Table"
import TableForm from "./forms/TableForm"


const TodoList = ({data, setData, projectId}) =>{

    const handleDragEnd = ({destination, source, draggableId, type}) =>{
        if(!destination) return
    
        if(destination.droppableId === source.droppableId && destination.index === source.index){
          return
        }
    
        const start = data.projects[source.droppableId.substring(0, 9)].content.tables[source.droppableId]
        const end = data.projects[destination.droppableId.substring(0, 9)].content.tables[destination.droppableId]

        if (type === "table") {
          // console.log(destination, source, draggableId)
          const newOrder = data.projects[source.droppableId].content.tableOrder
          newOrder.splice(source.index, 1)
          newOrder.splice(destination.index, 0, draggableId)
          setData({
            ...data,
          })
          return
        }
    
        if(start === end){
          const table = data.projects[source.droppableId.substring(0, 9)].content.tables[source.droppableId]
          const taskIds = [...table.taskIds]
          taskIds.splice(source.index, 1)
          taskIds.splice(destination.index, 0, draggableId)
          console.log(taskIds);
    
          const newTable = {
            ...table,
            taskIds
          }
    
          setData({
            ...data,
            projects:{
              ...data.projects,
              [source.droppableId.substring(0, 9)]: {
                ...data.projects[source.droppableId.substring(0, 9)],
                content: {
                  ...data.projects[source.droppableId.substring(0, 9)].content,
                  tables: {
                    ...data.projects[source.droppableId.substring(0, 9)].content.tables,
                    [table.id]:newTable,
                  }
                }
              }
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
          projects:{
            ...data.projects,
            [source.droppableId.substring(0, 9)]: {
              ...data.projects[source.droppableId.substring(0, 9)],
              content: {
                ...data.projects[source.droppableId.substring(0, 9)].content,
                tables: {
                  ...data.projects[source.droppableId.substring(0, 9)].content.tables,
                  [start.id]: newStartTable,
                  [end.id]: endTaskTable
                }
              }
            }
          }
        })
    
    
      }

    return(
        <div className='ml-72'>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId={projectId} direction='horizontal' type='table'>
                {(provided)=>{
                  return(
                    <>
                      <div className='ml-5 pt-5 flex'>
                        <h1 className='text-2xl font-bold'>{data.projects[projectId].name}</h1>
                        <TableForm data={data} setData={setData} projectId={projectId}/>
                      </div>
                      <div
                        className={`flex min-h-full w-fit md:w-full`}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {data.projects[projectId].content.tableOrder.map((tableId, index) =>{
                          const table = data.projects[projectId].content.tables[tableId]
                          // console.log(table);
                          const tasks = table.taskIds.map(taskId => data.projects[projectId].content.tasks[taskId])
                          // console.log(tasks);
                          // console.log(project.content);
                          return(
                            <Table
                              index={index}
                              key={table.id}
                              table={table}
                              tasks={tasks}
                              data={data.projects[projectId]}
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
      </div>
    )
}


export default TodoList