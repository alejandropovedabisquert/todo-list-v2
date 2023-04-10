import { useState } from "react";
import { Draggable } from "react-beautiful-dnd"
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import InputMaker from "./InputMaker";

export const TaskMaker = ({value, showInputEle, handleChange, handleBlur}) =>{
    return(
        <>
        {
            // Use JavaScript's ternary operator to specify <span>'s inner content
            showInputEle ? (
                <input 
                    type="text"
                    value={value.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                />
                ) : (
                <div 
                    className="w-full break-words"
                >
                    {value.content}
                </div>
            )
        }
        </>
    )

}

const Task = ({task, index, data, allData, setData, tableId}) =>{
    const [showInputEle, setShowInputEle] = useState(false);
    // console.log(data);
    const handleDeleteTask = (e) =>{
        // console.log(data);
        const index = data.content.tables[tableId].taskIds.indexOf(e)
        let reduceTask = data.content.tasks
        let reduceTaskAssigned = data.content.tables[tableId].taskIds
        delete reduceTask[e]
        reduceTaskAssigned.splice(index, 1)
        setData({
            ...allData,
        })
        // setData({
        //     ...data,
        //     tasks: reduceTask,
        //     tables: Object.assign({...data.tables, [tableId]: Object.assign(data.tables[tableId], {taskIds: reduceTaskAssigned})})
        // })
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
                        <div className="flex group relative">
                            {/* <div className="w-full break-words">{task.content}</div> */}
                            <InputMaker 
                                value={task.content} 
                                showInputEle={showInputEle}
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
                                handleBlur={() => setShowInputEle(false)} 
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