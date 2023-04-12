import { DragDropContext, Droppable } from "react-beautiful-dnd"
import Table from "./Table"
import TableForm from "./forms/TableForm"
import { FaRegEdit, FaTrashAlt } from "react-icons/fa"
import { useRef, useState } from "react"
import InputMaker from "./InputMaker"


const TodoList = ({data, setData, projectId}) =>{
  const [showInputEle, setShowInputEle] = useState(false);
  const [validation, setValidation] = useState(false)
  const inputRef = useRef()

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

    const handleDeleteProject = (e) =>{
      const index = data.projectsOrder.indexOf(e.id)
      let reduceProjectOrder = data.projectsOrder
      let reduceProject = data.projects
      delete reduceProject[e]
      reduceProjectOrder.splice(index, 1)
      console.log(reduceProjectOrder);
      setData({
          ...data,
      })
    }

    const handleValidation = () =>{
      if (data.projects[projectId].name !== "" && data.projects[projectId].name.trim().length !== 0) {
          setShowInputEle(false)
          setValidation(false)
      }else{
          setShowInputEle(false)
          setValidation(true)
          setData({
            ...data,
            projects:{
                ...data.projects,
                [projectId]:{
                    ...data.projects[projectId],
                    name: inputRef.current._wrapperState.initialValue
                }
            }
        })

      }
  }

    return(
        <div className='lg:pl-72 w-max lg:w-full'>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId={projectId} direction='horizontal' type='table'>
                {(provided, snapshot)=>{
                  console.log(snapshot);
                  return(
                    <>
                      <div className='pl-4 py-4 border-b-2 border-secondary-color bg-gray-50'>
                        {/* <h1 className='text-2xl font-bold mr-2'>{data.projects[projectId].name}</h1> */}
                        <div className="flex relative">
                          <InputMaker 
                                  value={data.projects[projectId].name} 
                                  showInputEle={showInputEle}
                                  validation={validation}
                                  handleChange={(e) => setData({
                                      ...data,
                                      projects:{
                                          ...data.projects,
                                          [projectId]:{
                                              ...data.projects[projectId],
                                              name: e.target.value
                                          }
                                      }
                                  })}
                                  classStyle={"text-2xl font-bold mr-2"}
                                  handleBlur={() => handleValidation()} 
                                  inputReference={inputRef}
                              />
                          <div className="ml-5">
                              <span className="cursor-pointer inline-block align-middle m-1 opacity-70 hover:opacity-95" onClick={() => setShowInputEle(true)}><FaRegEdit color="black" size={20}/></span>
                              <span className="cursor-pointer inline-block align-middle m-1 opacity-70 hover:opacity-95" onClick={() => handleDeleteProject(data.projects[projectId])}><FaTrashAlt color="red" size={20}/></span>
                          </div>
                        </div>
                      </div>
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        <TableForm data={data} setData={setData} projectId={projectId}/>
                        <div className={`flex h-full w-full bg-red-500 ${snapshot.isDraggingOver ? "mr-80": null}`}>
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
                        </div>
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