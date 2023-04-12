import { Draggable, Droppable } from "react-beautiful-dnd"
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import Task from "./Task"
import TaskForm from "./forms/TaskForm"
import { useState } from "react";
import InputMaker from "./InputMaker";
import { useRef } from "react";


const Table = ({tasks, table, index, data, allData, setData}) =>{
    const [showInputEle, setShowInputEle] = useState(false)
    const [validation, setValidation] = useState(false)
    const inputRef = useRef()
    
    const handleDeleteTable = (e) =>{
        const index = data.content.tableOrder.indexOf(e)
        let reduceTableOrder = data.content.tableOrder
        let reduceTable = data.content.tables
        delete reduceTable[e]
        reduceTableOrder.splice(index, 1)
        setData({
            ...allData,
        })
        //Crear una eliminación masiva de las tareas asignadas a una propia tabla
        // console.log(data.tasks);
    }

    const handleValidation = () =>{
        if (table.title !== "" && table.title.trim().length !== 0) {
            setShowInputEle(false)
            setValidation(false)
        }else{
            setShowInputEle(false)
            setValidation(true)
            setData({
                ...allData,
                projects:{
                    ...allData.projects,
                    [table.id.substring(0, 9)]:{
                        ...allData.projects[table.id.substring(0, 9)],
                        content:{
                            ...allData.projects[table.id.substring(0, 9)].content,
                            tables:{
                                ...allData.projects[table.id.substring(0, 9)].content.tables,
                                [table.id]:{
                                    ...allData.projects[table.id.substring(0, 9)].content.tables[table.id],
                                    title: inputRef.current._wrapperState.initialValue
                                }
                            }
                        }
                    }
                }
            })

        }
    }

    return(
        <Draggable index={index} draggableId={table.id} type='table'>
            {(provided) => {
                return(
                    <div
                        className={`w-72 min-w-[18rem] m-5`}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <div 
                            className="flex relative p-3 text-lg font-medium bg-slate-50 hover:bg-slate-200 transition-all duration-300 rounded-t-md border-2 border-secondary-color border-b-0 group break-all" 
                            {...provided.dragHandleProps}
                        >
                            <InputMaker 
                                value={table.title} 
                                showInputEle={showInputEle}
                                validation={validation}
                                handleChange={(e) => setData({
                                    ...allData,
                                    projects:{
                                        ...allData.projects,
                                        [table.id.substring(0, 9)]:{
                                            ...allData.projects[table.id.substring(0, 9)],
                                            content:{
                                                ...allData.projects[table.id.substring(0, 9)].content,
                                                tables:{
                                                    ...allData.projects[table.id.substring(0, 9)].content.tables,
                                                    [table.id]:{
                                                        ...allData.projects[table.id.substring(0, 9)].content.tables[table.id],
                                                        title: e.target.value
                                                    }
                                                }
                                            }
                                        }
                                    }
                                })}
                                classStyle={"font-bold"}
                                handleBlur={() => handleValidation()} 
                                inputReference={inputRef}
                            />
                            <div className="float-right flex">
                                <span className="cursor-pointer absolute hidden group-hover:inline-block group-hover:right-8 group-hover:p-1 group-hover:bg-slate-200 opacity-70 hover:opacity-95" onClick={() => setShowInputEle(true)}><FaRegEdit color="black"/></span>
                                <span className="cursor-pointer hidden absolute align-middle group-hover:inline-block group-hover:right-1 group-hover:bg-slate-200 group-hover:p-1 opacity-70 hover:opacity-95" onClick={() => handleDeleteTable(table.id)}><FaTrashAlt color="red"/></span>
                            </div>

                        </div>
                        <Droppable droppableId={table.id} type="task">
                            {(provided, snapshot) => {
                                const style = {
                                    backgroundColor: snapshot.isDraggingOver ? 'bg-slate-200' : 'bg-slate-50',
                                }

                                return(
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={`px-3 py-3 rounded-b-md border-2 border-secondary-color border-t-0 transition-all duration-300 shadow-lg ${style.backgroundColor}`}
                                    >
                                        {tasks.map((task, index) =>(
                                            <Task key={task.id} task={task} index={index} data={data} allData={allData} setData={setData} tableId={table.id}/>
                                        ))}
                                        {provided.placeholder}
                                        <TaskForm data={data} setData={setData} tableId={table.id} allData={allData}/>
                                    </div>
                                )
                                
                            }}
                        </Droppable>
                        
                    </div> 
                )
            }}
        </Draggable>
    )
}

export default Table