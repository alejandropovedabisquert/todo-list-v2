import { useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd"
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import InputMaker from "./InputMaker";


const Task = ({task, index, data, allData, setData, tableId}) =>{
    const [showInputEle, setShowInputEle] = useState(false);
    const [validation, setValidation] = useState(false)
    const inputRef = useRef()

    const handleDeleteTask = (e) =>{

        const index = data.content.tables[tableId].taskIds.indexOf(e)
        let reduceTask = data.content.tasks
        let reduceTaskAssigned = data.content.tables[tableId].taskIds
        delete reduceTask[e]
        reduceTaskAssigned.splice(index, 1)
        setData({
            ...allData,
        })
    }

    const handleValidation = () =>{
        if (task.content !== "" && task.content.trim().length !== 0) {
            setShowInputEle(false)
            setValidation(false)
        }else{
            setShowInputEle(false)
            setValidation(true)
            setData({
                ...allData,
                projects:{
                    ...allData.projects,
                    [tableId.substring(0, 9)]:{
                        ...allData.projects[tableId.substring(0, 9)],
                        content:{
                            ...allData.projects[tableId.substring(0, 9)].content,
                            tasks:{
                                ...allData.projects[tableId.substring(0, 9)].content.tasks,
                                [task.id]:{
                                   ...allData.projects[tableId.substring(0, 9)].content.tasks[task.id],
                                    content: inputRef.current._wrapperState.initialValue
                                }                            
                            }
                        }
                    }
                }
            })
        }
    }    

    return(
        <Draggable draggableId={task.id} index={index} type="task">
            {(provided, snapshot) =>{
                const style = {
                    background: snapshot.isDragging ? 'bg-primary-color' : 'bg-white',
                }
                return(
                    <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        className={`p-2 pl-3 rounded-md shadow-md mb-3 last:mb-0 ${style.background}`}
                    >
                        <div className="flex group relative break-all">
                            <InputMaker 
                                value={task.content} 
                                showInputEle={showInputEle}
                                validation={validation}
                                handleChange={(e) => setData({
                                    ...allData,
                                    projects:{
                                        ...allData.projects,
                                        [data.id]:{
                                            ...data,
                                            content:{
                                                ...data.content,
                                                tasks:{
                                                    ...data.content.tasks,
                                                    [task.id]:{
                                                        ...data.content.tasks[task.id],
                                                        content: e.target.value
                                                    }
                                                }
                                            }
                                        }
                                    }
                                })}
                                handleBlur={() => handleValidation()}
                                inputReference={inputRef} 
                            />
                            <div className="float-right">
                                <span className="cursor-pointer hidden rounded-md group-hover:inline-block group-hover:absolute group-hover:right-7 group-hover:p-1 group-hover:bg-slate-200 opacity-40 hover:opacity-75" onClick={() => setShowInputEle(true)}><FaRegEdit color="black"/></span>
                                <span className="cursor-pointer hidden group-hover:inline-block group-hover:absolute group-hover:right-0 group-hover:p-1 group-hover:bg-slate-200 opacity-40 hover:opacity-75" onClick={() => handleDeleteTask(task.id)}><FaTrashAlt color="red"/></span>
                            </div>

                        </div>
                    </div>
                )
                
            }}
        </Draggable>
    )
}

export default Task